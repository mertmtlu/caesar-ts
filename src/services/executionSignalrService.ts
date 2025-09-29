import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';

// --- Execution Event Interfaces ---
export interface ExecutionOutputEvent {
  executionId: string;
  output: string;
  timestamp: string;
}

export interface ExecutionErrorEvent {
  executionId: string;
  error: string;
  timestamp: string;
}

export interface ExecutionStatusChangedEventArgs {
  executionId: string;
  oldStatus: string;
  newStatus: string;
  changedAt: string;
  reason: string;
}

export interface ExecutionCompletedEventArgs {
  executionId: string;
  status: string;
  exitCode: number;
  completedAt: string;
  duration: number; // in minutes
  success: boolean;
  errorMessage?: string;
  outputFiles: string[];
}

type EventCallback<T> = (data: T) => void;

// --- ExecutionSignalRService Class with Extensive Logging ---
class ExecutionSignalRService {
  private connection: HubConnection | null = null;
  private isConnecting = false;
  private connectPromise: Promise<boolean> | null = null;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;

  // Event listeners
  private executionOutputListeners: EventCallback<ExecutionOutputEvent>[] = [];
  private executionErrorListeners: EventCallback<ExecutionErrorEvent>[] = [];
  private executionStatusChangedListeners: EventCallback<ExecutionStatusChangedEventArgs>[] = [];
  private executionCompletedListeners: EventCallback<ExecutionCompletedEventArgs>[] = [];
  private connectionStateListeners: EventCallback<HubConnectionState>[] = [];
  private initialLogsListeners: EventCallback<string[]>[] = [];

  constructor(private baseUrl: string, private getToken: () => string | null) {
    console.log(`[ExecutionSignalRService] 🚀 Constructor called. Base URL: ${this.baseUrl}`);
  }

  async connect(): Promise<boolean> {
    console.log('[ExecutionSignalRService] 🔌 Attempting to connect...');

    if (this.connection?.state === HubConnectionState.Connected) {
      console.log('[ExecutionSignalRService] ✅ Already connected.');
      return true;
    }

    if (this.isConnecting && this.connectPromise) {
      console.warn('[ExecutionSignalRService] ⏳ Connection attempt already in progress. Waiting for existing attempt...');
      return await this.connectPromise;
    }

    const connectAttempt = async (): Promise<boolean> => {
      try {
        this.isConnecting = true;
        console.log(`[ExecutionSignalRService] 🔧 Building connection to ${this.baseUrl}/executionHub`);

      this.connection = new HubConnectionBuilder()
        .withUrl(`${this.baseUrl}/executionHub`, {
          accessTokenFactory: () => {
            console.log('[ExecutionSignalRService] 🔑 Access token factory called.');
            const token = this.getToken();
            if (!token) {
              console.error('[ExecutionSignalRService] ❌ No authentication token available.');
              throw new Error('No authentication token available');
            }
            console.log('[ExecutionSignalRService] ✨ Token provided to SignalR.');
            return token;
          },
          withCredentials: false
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            console.log(`[ExecutionSignalRService] 🔄 Reconnect attempt #${retryContext.previousRetryCount + 1}.`);
            if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
              const delay = this.reconnectDelay * Math.pow(2, retryContext.previousRetryCount);
              console.log(`[ExecutionSignalRService] ⏳ Next reconnect attempt in ${delay}ms.`);
              return delay;
            }
            console.log('[ExecutionSignalRService] 🛑 Max reconnect attempts reached. Stopping.');
            return null;
          }
        })
        .configureLogging(LogLevel.Information)
        .build();

      console.log('[ExecutionSignalRService] 🔧 Connection built. Setting up event handlers.');
      this.setupEventHandlers();

      console.log('[ExecutionSignalRService] 🏁 Starting connection...');
      await this.connection.start();

        console.log(`[ExecutionSignalRService] ✅ Connection successful!`);
        this.notifyConnectionStateChange(this.connection.state);

        return true;

      } catch (error) {
        console.error('[ExecutionSignalRService] ❌ SignalR connection failed:', error);
        this.connection = null;
        return false;
      } finally {
        console.log('[ExecutionSignalRService] 🔚 Connect method finished.');
        this.isConnecting = false;
        this.connectPromise = null;
      }
    };

    this.connectPromise = connectAttempt();
    return await this.connectPromise;
  }

  async disconnect(): Promise<void> {
    console.log('[ExecutionSignalRService] 🔌 Attempting to disconnect...');
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log('[ExecutionSignalRService] ✅ SignalR disconnected from Execution Hub');
      } catch (error) {
        console.error('[ExecutionSignalRService] ❌ Error disconnecting SignalR:', error);
      }
      this.connection = null;
      this.notifyConnectionStateChange(HubConnectionState.Disconnected);
    } else {
      console.warn('[ExecutionSignalRService] 🤷 No active connection to disconnect.');
    }
  }

  private setupEventHandlers(): void {
    console.log('[ExecutionSignalRService] 🎧 Setting up event handlers...');
    if (!this.connection) {
      console.error('[ExecutionSignalRService] ❌ Cannot set up event handlers, connection is null.');
      return;
    }

    this.connection.on('ExecutionOutput', (data: ExecutionOutputEvent) => {
      this.executionOutputListeners.forEach(listener => listener(data));
    });

    this.connection.on('ExecutionError', (data: ExecutionErrorEvent) => {
      this.executionErrorListeners.forEach(listener => listener(data));
    });

    this.connection.on('ExecutionStatusChanged', (data: ExecutionStatusChangedEventArgs) => {
      this.executionStatusChangedListeners.forEach(listener => listener(data));
    });

    this.connection.on('ExecutionCompleted', (data: ExecutionCompletedEventArgs) => {
      this.executionCompletedListeners.forEach(listener => listener(data));
    });

    this.connection.on('InitialLogs', (data: string[]) => {
      console.log(`[ExecutionSignalRService] 📨 Received ${data.length} initial log lines.`);
      this.initialLogsListeners.forEach(listener => listener(data));
    });

    this.connection.on('JoinedExecutionGroup', (executionId: string) => {
      console.log(`[ExecutionSignalRService] 🎉 Confirmed joined execution group: ${executionId}`);
    });

    this.connection.on('LeftExecutionGroup', (executionId: string) => {
      console.log(`[ExecutionSignalRService] 👋 Confirmed left execution group: ${executionId}`);
    });

    this.connection.onreconnecting((error) => {
      console.warn('[ExecutionSignalRService] 🔄 SignalR is reconnecting...', error || '');
      this.notifyConnectionStateChange(HubConnectionState.Reconnecting);
    });

    this.connection.onreconnected((connectionId) => {
      console.log(`[ExecutionSignalRService] ✅ SignalR reconnected with new connection ID: ${connectionId}`);
      this.notifyConnectionStateChange(HubConnectionState.Connected);
    });

    this.connection.onclose((error) => {
      console.warn('[ExecutionSignalRService] 🛑 SignalR connection closed.', error || '');
      this.notifyConnectionStateChange(HubConnectionState.Disconnected);
    });
  }

  private notifyConnectionStateChange(state: HubConnectionState): void {
    this.connectionStateListeners.forEach(listener => listener(state));
  }

  onExecutionOutput(callback: EventCallback<ExecutionOutputEvent>): () => void {
    this.executionOutputListeners.push(callback);
    return () => {
      const index = this.executionOutputListeners.indexOf(callback);
      if (index > -1) this.executionOutputListeners.splice(index, 1);
    };
  }

  onExecutionError(callback: EventCallback<ExecutionErrorEvent>): () => void {
    this.executionErrorListeners.push(callback);
    return () => {
      const index = this.executionErrorListeners.indexOf(callback);
      if (index > -1) this.executionErrorListeners.splice(index, 1);
    };
  }

  onExecutionStatusChanged(callback: EventCallback<ExecutionStatusChangedEventArgs>): () => void {
    this.executionStatusChangedListeners.push(callback);
    return () => {
      const index = this.executionStatusChangedListeners.indexOf(callback);
      if (index > -1) this.executionStatusChangedListeners.splice(index, 1);
    };
  }

  onExecutionCompleted(callback: EventCallback<ExecutionCompletedEventArgs>): () => void {
    this.executionCompletedListeners.push(callback);
    return () => {
      const index = this.executionCompletedListeners.indexOf(callback);
      if (index > -1) this.executionCompletedListeners.splice(index, 1);
    };
  }
  
  onInitialLogs(callback: EventCallback<string[]>): () => void {
    this.initialLogsListeners.push(callback);
    return () => {
        const index = this.initialLogsListeners.indexOf(callback);
        if (index > -1) this.initialLogsListeners.splice(index, 1);
    };
  }

  onConnectionStateChanged(callback: EventCallback<HubConnectionState>): () => void {
    this.connectionStateListeners.push(callback);
    return () => {
      const index = this.connectionStateListeners.indexOf(callback);
      if (index > -1) this.connectionStateListeners.splice(index, 1);
    };
  }

  async joinExecutionGroup(executionId: string): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected) {
      await this.connection.invoke('JoinExecutionGroup', executionId);
    }
  }

  async leaveExecutionGroup(executionId: string): Promise<void> {
    if (this.connection?.state === HubConnectionState.Connected) {
      await this.connection.invoke('LeaveExecutionGroup', executionId);
    }
  }

  get connectionState(): HubConnectionState {
    return this.connection?.state || HubConnectionState.Disconnected;
  }
}

let executionSignalRService: ExecutionSignalRService | null = null;

export const createExecutionSignalRService = (baseUrl: string, getToken: () => string | null): ExecutionSignalRService => {
  if (!executionSignalRService) {
    executionSignalRService = new ExecutionSignalRService(baseUrl, getToken);
  }
  return executionSignalRService;
};

export default ExecutionSignalRService;