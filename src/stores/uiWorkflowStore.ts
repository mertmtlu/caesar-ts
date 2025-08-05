import { create } from 'zustand';
import { HubConnectionState } from '@microsoft/signalr';

// Types for UI workflow interactions
export interface UIInteractionSession {
  sessionId: string;
  workflowId: string;
  executionId: string;
  nodeId: string;
  status: 'Pending' | 'Active' | 'AwaitingInput' | 'Completed' | 'Cancelled' | 'TimedOut';
  uiComponent: UIComponentData;
  contextData: Record<string, unknown>;
  timeoutAt: Date;
  createdAt: Date;
  completedAt?: Date;
}

export interface UIComponentData {
  id: string;
  name: string;
  type: string;
  configuration: {
    title?: string;
    description?: string;
    fields: UIInputField[];
    submitLabel?: string;
    cancelLabel?: string;
    allowSkip?: boolean;
  };
}

export interface UIInputField {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea' | 'file';
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface WorkflowUIInteractionState {
  // Connection state
  connectionState: HubConnectionState;
  isConnected: boolean;
  
  // UI Interaction sessions
  sessions: Record<string, UIInteractionSession>; // sessionId -> session
  pendingSessions: string[]; // sessionIds that need user attention
  activeSessions: string[]; // sessionIds currently being handled
  
  // Current workflow context
  currentWorkflowId: string | null;
  currentExecutionId: string | null;
  
  // Active modal state
  activeSessionId: string | null;
  isModalOpen: boolean;
  
  // Notifications
  notifications: UINotification[];
  
  // Actions
  setConnectionState: (state: HubConnectionState) => void;
  setCurrentWorkflow: (workflowId: string | null, executionId: string | null) => void;
  
  // Session management
  addSession: (session: UIInteractionSession) => void;
  updateSession: (sessionId: string, updates: Partial<UIInteractionSession>) => void;
  removeSession: (sessionId: string) => void;
  clearSessions: () => void;
  
  // Modal management
  openModal: (sessionId: string) => void;
  closeModal: () => void;
  
  // Session filtering
  getSessionsForWorkflow: (workflowId: string, executionId: string) => UIInteractionSession[];
  getPendingSessionsForWorkflow: (workflowId: string, executionId: string) => UIInteractionSession[];
  getActiveSession: () => UIInteractionSession | null;
  
  // Notifications
  addNotification: (notification: Omit<UINotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface UINotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  autoHide?: boolean;
  duration?: number; // in ms
}

export const useUIWorkflowStore = create<WorkflowUIInteractionState>((set, get) => ({
  // Initial state
  connectionState: HubConnectionState.Disconnected,
  isConnected: false,
  sessions: {},
  pendingSessions: [],
  activeSessions: [],
  currentWorkflowId: null,
  currentExecutionId: null,
  activeSessionId: null,
  isModalOpen: false,
  notifications: [],

  // Connection actions
  setConnectionState: (state: HubConnectionState) => {
    set({
      connectionState: state,
      isConnected: state === HubConnectionState.Connected
    });
  },

  setCurrentWorkflow: (workflowId: string | null, executionId: string | null) => {
    set({
      currentWorkflowId: workflowId,
      currentExecutionId: executionId
    });
  },

  // Session management
  addSession: (session: UIInteractionSession) => {
    console.log('🔧 [addSession] Adding session:', session);
    console.log('  📋 Session status:', session.status);
    console.log('  📋 Session workflowId:', session.workflowId);
    console.log('  📋 Session executionId:', session.executionId);
    console.log('  📋 Current workflow context:', get().currentWorkflowId, get().currentExecutionId);

    set((state) => {
      const newSessions = { ...state.sessions, [session.sessionId]: session };
      const newPendingSessions = [...state.pendingSessions];

      console.log('  📋 Current pendingSessions before:', state.pendingSessions);
      console.log('  📋 Session matches current workflow:',
        session.workflowId === state.currentWorkflowId &&
        session.executionId === state.currentExecutionId);

      // Add to pending if it's awaiting input and not already there
      if (session.status === 'Pending' && !newPendingSessions.includes(session.sessionId)) {
        newPendingSessions.push(session.sessionId);
        console.log('  ✅ Added to pendingSessions array:', session.sessionId);
      } else {
        console.log('  ❌ NOT added to pendingSessions. Reason:');
        console.log('    - Status is Pending:', session.status === 'Pending');
        console.log('    - Already in pending:', newPendingSessions.includes(session.sessionId));
        console.log('    - Current status:', session.status);
      }

      console.log('  📋 New pendingSessions after:', newPendingSessions);
      console.log('  📋 Total sessions after:', Object.keys(newSessions).length);

      return {
        sessions: newSessions,
        pendingSessions: newPendingSessions
      };
    });
  },

  updateSession: (sessionId: string, updates: Partial<UIInteractionSession>) => {
    set((state) => {
      const existingSession = state.sessions[sessionId];
      if (!existingSession) return state;

      const updatedSession = { ...existingSession, ...updates };
      const newSessions = { ...state.sessions, [sessionId]: updatedSession };
      
      let newPendingSessions = [...state.pendingSessions];
      let newActiveSessions = [...state.activeSessions];

      // Update pending/active session lists based on status
      if (updates.status) {
        const sessionIndex = newPendingSessions.indexOf(sessionId);
        const activeIndex = newActiveSessions.indexOf(sessionId);

        if (updates.status === 'Pending' && sessionIndex === -1) {
          newPendingSessions.push(sessionId);
        } else if (updates.status !== 'Pending' && sessionIndex > -1) {
          newPendingSessions.splice(sessionIndex, 1);
        }

        if (updates.status === 'Active' && activeIndex === -1) {
          newActiveSessions.push(sessionId);
        } else if (updates.status !== 'Active' && activeIndex > -1) {
          newActiveSessions.splice(activeIndex, 1);
        }
      }

      return {
        sessions: newSessions,
        pendingSessions: newPendingSessions,
        activeSessions: newActiveSessions
      };
    });
  },

  removeSession: (sessionId: string) => {
    set((state) => {
      const newSessions = { ...state.sessions };
      delete newSessions[sessionId];

      const newPendingSessions = state.pendingSessions.filter(id => id !== sessionId);
      const newActiveSessions = state.activeSessions.filter(id => id !== sessionId);

      // Close modal if it was showing this session
      const newActiveSessionId = state.activeSessionId === sessionId ? null : state.activeSessionId;
      const newIsModalOpen = state.activeSessionId === sessionId ? false : state.isModalOpen;

      return {
        sessions: newSessions,
        pendingSessions: newPendingSessions,
        activeSessions: newActiveSessions,
        activeSessionId: newActiveSessionId,
        isModalOpen: newIsModalOpen
      };
    });
  },

  clearSessions: () => {
    set({
      sessions: {},
      pendingSessions: [],
      activeSessions: [],
      activeSessionId: null,
      isModalOpen: false
    });
  },

  // Modal management
  openModal: (sessionId: string) => {
    const state = get();
    if (state.sessions[sessionId]) {
      set({
        activeSessionId: sessionId,
        isModalOpen: true
      });
    }
  },

  closeModal: () => {
    set({
      activeSessionId: null,
      isModalOpen: false
    });
  },

  // Session filtering
  getSessionsForWorkflow: (workflowId: string, executionId: string) => {
    const state = get();
    return Object.values(state.sessions).filter(
      session => session.workflowId === workflowId && session.executionId === executionId
    );
  },

  getPendingSessionsForWorkflow: (workflowId: string, executionId: string) => {
    const state = get();

    console.log('🔍 [getPendingSessionsForWorkflow] Debug Info:');
    console.log('  📋 Requested workflowId:', workflowId);
    console.log('  📋 Requested executionId:', executionId);
    console.log('  📋 state.pendingSessions array:', state.pendingSessions);
    console.log('  📋 Total sessions in store:', Object.keys(state.sessions).length);

    // DEBUG: Show detailed session info
    Object.values(state.sessions).forEach((session, index) => {
      console.log(`  📋 Session ${index + 1}:`, {
        sessionId: session.sessionId,
        workflowId: session.workflowId,
        executionId: session.executionId,
        nodeId: session.nodeId,
        status: session.status,
        workflowMatches: session.workflowId === workflowId,
        executionMatches: session.executionId === executionId
      });
    });

    const mappedSessions = state.pendingSessions.map(sessionId => {
      const session = state.sessions[sessionId];
      console.log(`  🔗 Mapping sessionId ${sessionId}:`, session ? 'found' : 'NOT FOUND');
      if (session) {
        console.log(`    - workflowId: ${session.workflowId} (matches: ${session.workflowId ===
  workflowId})`);
        console.log(`    - executionId: ${session.executionId} (matches: ${session.executionId ===
  executionId})`);
        console.log(`    - status: ${session.status}`);
      }
      return session;
    });

    const filteredSessions = mappedSessions.filter(session =>
      session &&
      session.workflowId === workflowId &&
      session.executionId === executionId
    );

    console.log('  ✅ Final filtered sessions count:', filteredSessions.length);
    console.log('  ✅ Final filtered sessions:', filteredSessions);

    return filteredSessions;
  },

  getActiveSession: () => {
    const state = get();
    return state.activeSessionId ? state.sessions[state.activeSessionId] || null : null;
  },

  // Notifications
  addNotification: (notification: Omit<UINotification, 'id' | 'timestamp'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: UINotification = {
      ...notification,
      id,
      timestamp: new Date()
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications]
    }));

    // Auto-hide notification if specified
    if (newNotification.autoHide !== false) {
      const duration = newNotification.duration || 5000;
      setTimeout(() => {
        get().removeNotification(id);
      }, duration);
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));

// Helper hooks for common use cases
export const useCurrentWorkflowSessions = () => {
  const { currentWorkflowId, currentExecutionId, getSessionsForWorkflow } = useUIWorkflowStore();
  
  if (!currentWorkflowId || !currentExecutionId) {
    return [];
  }
  
  return getSessionsForWorkflow(currentWorkflowId, currentExecutionId);
};

export const useCurrentWorkflowPendingSessions = () => {
  const { currentWorkflowId, currentExecutionId, getPendingSessionsForWorkflow } = useUIWorkflowStore();
  
  if (!currentWorkflowId || !currentExecutionId) {
    return [];
  }
  
  return getPendingSessionsForWorkflow(currentWorkflowId, currentExecutionId);
};

export const useUIWorkflowModal = () => {
  const { isModalOpen, activeSessionId, getActiveSession, openModal, closeModal } = useUIWorkflowStore();
  
  return {
    isOpen: isModalOpen,
    activeSessionId,
    activeSession: getActiveSession(),
    openModal,
    closeModal
  };
};