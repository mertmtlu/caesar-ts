import { create } from 'zustand';
import { api } from '../api/api';
import { AIConversationRequestDto, ConversationMessage, FileOperationDto } from '../api/types';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  fileOperations?: FileOperationDto[];
  warnings?: string[];
}

interface AIStore {
  // State
  conversationHistory: Message[];
  isThinking: boolean;
  error: string | null;
  currentProgramId: string | null;
  currentVersionId: string | null;

  // Actions
  sendMessage: (userPrompt: string) => Promise<FileOperationDto[]>;
  clearConversation: () => void;
  setCurrentProgram: (programId: string, versionId?: string) => void;
  setError: (error: string | null) => void;
}

export const useAIStore = create<AIStore>((set, get) => ({
  // Initial state
  conversationHistory: [],
  isThinking: false,
  error: null,
  currentProgramId: null,
  currentVersionId: null,

  // Actions
  sendMessage: async (userPrompt: string) => {
    const state = get();

    if (!state.currentProgramId) {
      const error = 'No program selected. Please select a program first.';
      set({ error });
      throw new Error(error);
    }

    // Add user message to history
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    };

    set({
      conversationHistory: [...state.conversationHistory, userMessage],
      isThinking: true,
      error: null
    });

    try {
      // Prepare conversation history for API (ConversationMessage format)
      const conversationMessages: ConversationMessage[] = state.conversationHistory.map(msg => {
        const convMsg = new ConversationMessage();
        convMsg.role = msg.role;
        convMsg.content = msg.content;
        convMsg.timestamp = msg.timestamp;
        convMsg.fileOperations = msg.fileOperations;
        return convMsg;
      });

      // Add the new user message to conversation history
      const newUserMsg = new ConversationMessage();
      newUserMsg.role = 'user';
      newUserMsg.content = userPrompt;
      newUserMsg.timestamp = new Date();
      conversationMessages.push(newUserMsg);

      // Create request
      const request = new AIConversationRequestDto({
        userPrompt,
        programId: state.currentProgramId,
        versionId: state.currentVersionId || undefined,
        conversationHistory: conversationMessages,
      });

      // Call API
      const response = await api.aiAssistantClient.aIAssistant_Converse(request);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to get response from AI');
      }

      const aiResponse = response.data;

      console.log('AI Response:', aiResponse);

      // Convert file operations from interface to class instances
      const fileOperations = aiResponse.fileOperations || [];

      // Add assistant message to history
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse.displayText || '',
        timestamp: new Date(),
        fileOperations: fileOperations as FileOperationDto[],
        warnings: aiResponse.warnings,
      };

      set({
        conversationHistory: [...get().conversationHistory, assistantMessage],
        isThinking: false,
      });

      // Return file operations for editor integration
      return fileOperations as FileOperationDto[];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({
        error: errorMessage,
        isThinking: false
      });
      throw error;
    }
  },

  clearConversation: () => {
    set({
      conversationHistory: [],
      error: null
    });
  },

  setCurrentProgram: (programId: string, versionId?: string) => {
    set({
      currentProgramId: programId,
      currentVersionId: versionId,
      // Clear conversation when switching programs
      conversationHistory: [],
      error: null
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));


// 📋 Next Steps for You

//   1. Set Up Environment Variables

//   Create or update .env file in TeiasMongoAPI.API directory:

//   # Gemini API Key (required for both LLM and embeddings)
//   GEMINI_API_KEY=your-gemini-api-key-here

//   2. Start Qdrant (if using vector search)

//   # From the TeiasMongoAPI root directory
//   docker-compose -f docker-compose.qdrant.yml up -d

//   # Verify Qdrant is running
//   curl http://localhost:6333/health

//   3. Update appsettings.json

//   The LLM and VectorStore sections are already configured! Just update:
//   - LLM:ApiKey - Your Gemini API key (or use environment variable)
//   - VectorStore:EnableVectorSearch - Set to false if you don't want vector search initially

//   4. Build the Project

//   dotnet restore
//   dotnet build

//   5. Test the Implementation

//   The AI assistant will now:
//   - ✅ See ALL files in the project via the code index
//   - ✅ Handle unsaved editor changes
//   - ✅ Use 40-90K tokens of context (configurable)
//   - ✅ Optionally use semantic search to find relevant code

//   6. Index Your First Project (for vector search)

//   You'll need to create an indexing endpoint or background job to:
//   1. Call ICodeChunker.ChunkProjectAsync(programId, versionId)
//   2. Call IEmbeddingService.GenerateEmbeddingsAsync() for each chunk
//   3. Call IVectorStore.UpsertChunksAsync() to store them

//   ---