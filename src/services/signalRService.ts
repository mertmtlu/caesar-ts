import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

// --- Interfaces (unchanged) ---
export interface UIInteractionEvent {
  sessionId: string;
  workflowId: string;
  executionId: string;
  nodeId: string;
  uiComponent: Record<string, unknown>;
  contextData: Record<string, unknown>;
  timeoutAt: string;
}

export interface UIInteractionStatusChangedEvent {
  sessionId: string;
  workflowId: string;
  executionId: string;
  status: string;
  completedAt?: string;
}

// New interface for the enhanced payload event
export interface UIInteractionWithPayloadEvent {
  sessionId: string;
  workflowId: string;
  executionId: string;
  nodeId: string;
  status: string;
  session: UIInteractionSession; // Complete session data included
  uiComponent: Record<string, unknown>;
  contextData: Record<string, unknown>;
  timeoutAt: string;
  createdAt: string;
  timeout?: number;
}

// Session interface (matches the one from store)
export interface UIInteractionSession {
  sessionId: string;
  workflowId: string;
  executionId: string;
  nodeId: string;
  status: string;
  interactionType: string;
  title: string;
  description?: string;
  inputSchema: Record<string, unknown>;
  inputData: Record<string, unknown>;
  outputData?: Record<string, unknown>;
  timeoutAt?: string;
  createdAt: string;
  completedAt?: string;
  metadata: Record<string, unknown>;
  uiComponentId?: string;
  uiComponentConfiguration?: Record<string, unknown>;
}

type EventCallback<T> = (data: T) => void;

// --- SignalRService Class with Extensive Logging ---
class SignalRService {
  private connection: HubConnection | null = null;
  private isConnecting = false;
  private connectPromise: Promise<boolean> | null = null;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;

  // Event listeners
  private uiInteractionAvailableListeners: EventCallback<UIInteractionEvent>[] = [];
  private uiInteractionWithPayloadListeners: EventCallback<UIInteractionWithPayloadEvent>[] = [];
  private uiInteractionStatusChangedListeners: EventCallback<UIInteractionStatusChangedEvent>[] = [];
  private connectionStateListeners: EventCallback<HubConnectionState>[] = [];

  constructor(private baseUrl: string, private getToken: () => string | null) {
    console.log(`[SignalRService] 🚀 Constructor called. Base URL: ${this.baseUrl}`);
  }

  async connect(): Promise<boolean> {
    console.log('[SignalRService] 🔌 Attempting to connect...');

    if (this.connection?.state === HubConnectionState.Connected) {
      console.log('[SignalRService] ✅ Already connected.');
      return true;
    }

    if (this.isConnecting && this.connectPromise) {
      console.warn('[SignalRService] ⏳ Connection attempt already in progress. Waiting for existing attempt...');
      return await this.connectPromise;
    }

    const connectAttempt = async (): Promise<boolean> => {
      try {
        this.isConnecting = true;
        console.log(`[SignalRService] 🔧 Building connection to ${this.baseUrl}/uiWorkflowHub`);

      // Create connection with authentication
      this.connection = new HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/uiWorkflowHub`, {
          accessTokenFactory: () => {
            console.log('[SignalRService] 🔑 Access token factory called.');
            const token = this.getToken();
            if (!token) {
              console.error('[SignalRService] ❌ No authentication token available.');
              throw new Error('No authentication token available');
            }
            console.log('[SignalRService] ✨ Token provided to SignalR.');
            return token;
          },
          withCredentials: false // Match server CORS policy
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            console.log(`[SignalRService] 🔄 Reconnect attempt #${retryContext.previousRetryCount + 1}.`);
            if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
              const delay = this.reconnectDelay * Math.pow(2, retryContext.previousRetryCount);
              console.log(`[SignalRService] 딜 Next reconnect attempt in ${delay}ms.`);
              return delay;
            }
            console.log('[SignalRService] 🛑 Max reconnect attempts reached. Stopping.');
            return null; // Stop retrying
          }
        })
        .configureLogging(LogLevel.Information)
        .build();

      console.log('[SignalRService] 🔧 Connection built. Setting up event handlers.');
      // Set up event handlers
      this.setupEventHandlers();

      console.log('[SignalRService] 🏁 Starting connection...');
      // Start connection
      await this.connection.start();

        console.log(`[SignalRService] ✅ Connection successful!`);
        this.notifyConnectionStateChange(this.connection.state);

        return true;

      } catch (error) {
        console.error('[SignalRService] ❌ SignalR connection failed:', error);
        this.connection = null;
        return false;
      } finally {
        console.log('[SignalRService] 🔚 Connect method finished.');
        this.isConnecting = false;
        this.connectPromise = null;
      }
    };

    this.connectPromise = connectAttempt();
    return await this.connectPromise;
  }

  async disconnect(): Promise<void> {
    console.log('[SignalRService] 🔌 Attempting to disconnect...');
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log('[SignalRService] ✅ SignalR disconnected from UI Workflow Hub');
      } catch (error) {
        console.error('[SignalRService] ❌ Error disconnecting SignalR:', error);
      }
      this.connection = null;
      this.notifyConnectionStateChange(HubConnectionState.Disconnected);
    } else {
      console.warn('[SignalRService] 🤷 No active connection to disconnect.');
    }
  }

  private setupEventHandlers(): void {
    console.log('[SignalRService] 🎧 Setting up event handlers...');
    if (!this.connection) {
      console.error('[SignalRService] ❌ Cannot set up event handlers, connection is null.');
      return;
    }

    // NEW: UI Interaction Created With Payload (Solution 1)
    console.log('[SignalRService] 🎧 Listening for "UIInteractionCreatedWithPayload" event.');
    this.connection.on('UIInteractionCreatedWithPayload', (data: UIInteractionWithPayloadEvent) => {
      console.log('[SignalRService] 📦 Received UIInteractionCreatedWithPayload with complete session data:', data);
      this.uiInteractionWithPayloadListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('❌ Error in "UIInteractionCreatedWithPayload" listener:', error);
        }
      });
    });

    // UI Interaction Available (legacy)
    console.log('[SignalRService] 🎧 Listening for "UIInteractionAvailable" event.');
    this.connection.on('UIInteractionAvailable', (data: UIInteractionEvent) => {
      console.log('[SignalRService] 📨 Received legacy UIInteractionAvailable event:', data);
      this.uiInteractionAvailableListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('❌ Error in "UIInteractionAvailable" listener:', error);
        }
      });
    });

    // UI Interaction Created (new)
    console.log('[SignalRService] 🎧 Listening for "UIInteractionCreated" event.');
    this.connection.on('UIInteractionCreated', (data: UIInteractionEvent) => {
      console.log('[SignalRService] 📨 Received UIInteractionCreated event:', data);
      this.uiInteractionAvailableListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('❌ Error in "UIInteractionCreated" listener:', error);
        }
      });
    });

    // UI Interaction Status Changed
    console.log('[SignalRService] 🎧 Listening for "UIInteractionStatusChanged" event.');
    this.connection.on('UIInteractionStatusChanged', (data: UIInteractionStatusChangedEvent) => {
      this.uiInteractionStatusChangedListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('❌ Error in "UIInteractionStatusChanged" listener:', error);
        }
      });
    });

    // Workflow group confirmation events
    console.log('[SignalRService] 🎧 Listening for group confirmation events.');
    this.connection.on('JoinedWorkflowGroup', (workflowId: string) => {
      console.log(`[SignalRService] 🎉 Confirmed joined workflow group: ${workflowId}`);
    });

    this.connection.on('LeftWorkflowGroup', (workflowId: string) => {
      console.log(`[SignalRService] 👋 Confirmed left workflow group: ${workflowId}`);
    });

    // Connection state changes
    console.log('[SignalRService] 🎧 Setting up connection state change handlers (onreconnecting, onreconnected, onclose).');
    this.connection.onreconnecting((error) => {
      console.warn('[SignalRService] 🔄 SignalR is reconnecting...', error || '');
      this.notifyConnectionStateChange(HubConnectionState.Reconnecting);
    });

    this.connection.onreconnected((connectionId) => {
      console.log(`[SignalRService] ✅ SignalR reconnected with new connection ID: ${connectionId}`);
      this.notifyConnectionStateChange(HubConnectionState.Connected);
    });

    this.connection.onclose((error) => {
      console.warn('[SignalRService] 🛑 SignalR connection closed.', error || '');
      this.notifyConnectionStateChange(HubConnectionState.Disconnected);
    });
  }

  private notifyConnectionStateChange(state: HubConnectionState): void {
    console.log(`[SignalRService] 📣 Notifying ${this.connectionStateListeners.length} listeners of state change: ${state}`);
    this.connectionStateListeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.error('❌ Error in connection state listener:', error);
      }
    });
  }

  // Event subscription methods
  onUIInteractionAvailable(callback: EventCallback<UIInteractionEvent>): () => void {
    console.log('[SignalRService] ➕ Adding a listener for UIInteractionAvailable/Created events.');
    this.uiInteractionAvailableListeners.push(callback);
    return () => {
      const index = this.uiInteractionAvailableListeners.indexOf(callback);
      if (index > -1) {
        console.log('[SignalRService] ➖ Removing a listener for UIInteractionAvailable/Created events.');
        this.uiInteractionAvailableListeners.splice(index, 1);
      }
    };
  }

  // NEW: Add subscription method for payload events
  onUIInteractionWithPayload(callback: EventCallback<UIInteractionWithPayloadEvent>): () => void {
    console.log('[SignalRService] ➕ Adding a listener for UIInteractionCreatedWithPayload events.');
    this.uiInteractionWithPayloadListeners.push(callback);
    return () => {
      const index = this.uiInteractionWithPayloadListeners.indexOf(callback);
      if (index > -1) {
        console.log('[SignalRService] ➖ Removing a listener for UIInteractionCreatedWithPayload events.');
        this.uiInteractionWithPayloadListeners.splice(index, 1);
      }
    };
  }

  onUIInteractionStatusChanged(callback: EventCallback<UIInteractionStatusChangedEvent>): () => void {
    console.log('[SignalRService] ➕ Adding a listener for UIInteractionStatusChanged events.');
    this.uiInteractionStatusChangedListeners.push(callback);
    return () => {
      const index = this.uiInteractionStatusChangedListeners.indexOf(callback);
      if (index > -1) {
        console.log('[SignalRService] ➖ Removing a listener for UIInteractionStatusChanged events.');
        this.uiInteractionStatusChangedListeners.splice(index, 1);
      }
    };
  }

  onConnectionStateChanged(callback: EventCallback<HubConnectionState>): () => void {
    console.log('[SignalRService] ➕ Adding a listener for connection state changes.');
    this.connectionStateListeners.push(callback);
    return () => {
      const index = this.connectionStateListeners.indexOf(callback);
      if (index > -1) {
        console.log('[SignalRService] ➖ Removing a listener for connection state changes.');
        this.connectionStateListeners.splice(index, 1);
      }
    };
  }

  // Hub methods
  async joinWorkflowGroup(workflowId: string): Promise<void> {
    console.log(`[SignalRService] ➡️ Invoking "JoinWorkflowGroup" for workflow ID: ${workflowId}`);
    if (this.connection?.state === HubConnectionState.Connected) {
      try {
        await this.connection.invoke('JoinWorkflowGroup', workflowId);
        console.log(`[SignalRService] ✅ Successfully invoked JoinWorkflowGroup for: ${workflowId}`);
      } catch (error) {
        console.error(`[SignalRService] ❌ Failed to invoke JoinWorkflowGroup for ${workflowId}:`, error);
      }
    } else {
      console.warn(`[SignalRService] ⚠️ Cannot join group, not connected. Current state: ${this.connection?.state}`);
    }
  }

  async leaveWorkflowGroup(workflowId: string): Promise<void> {
    console.log(`[SignalRService] ➡️ Invoking "LeaveWorkflowGroup" for workflow ID: ${workflowId}`);
    if (this.connection?.state === HubConnectionState.Connected) {
      try {
        await this.connection.invoke('LeaveWorkflowGroup', workflowId);
        console.log(`[SignalRService] ✅ Successfully invoked LeaveWorkflowGroup for: ${workflowId}`);
      } catch (error) {
        console.error(`[SignalRService] ❌ Error invoking LeaveWorkflowGroup for ${workflowId}:`, error);
      }
    } else {
      console.warn(`[SignalRService] ⚠️ Cannot leave group, not connected. Current state: ${this.connection?.state}`);
    }
  }

  // Utility methods
  get connectionState(): HubConnectionState {
    return this.connection?.state || HubConnectionState.Disconnected;
  }

  get isConnected(): boolean {
    return this.connection?.state === HubConnectionState.Connected;
  }
}

// --- Singleton Creation and Export with Logging ---
let signalRService: SignalRService | null = null;

export const createSignalRService = (baseUrl: string, getToken: () => string | null): SignalRService => {
  if (!signalRService) {
    console.log('[SignalRService Singleton] 🏭 Creating new SignalRService instance.');
    signalRService = new SignalRService(baseUrl, getToken);
  } else {
    console.log('[SignalRService Singleton] ℹ️ Returning existing SignalRService instance.');
  }
  return signalRService;
};

export const getSignalRService = (): SignalRService | null => {
  console.log('[SignalRService Singleton] 🔎 Getting SignalRService instance.');
  if (!signalRService) {
    console.warn('[SignalRService Singleton] ⚠️ Service instance requested but not yet created.');
  }
  return signalRService;
};

export default SignalRService;