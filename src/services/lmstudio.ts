
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  model?: string;
}

export interface EmbeddingRequest {
  input: string | string[];
  model?: string;
}

export const lmStudioService = {
  getModels: async () => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: {},
        responseType: 'json',
        query: { endpoint: 'models' }
      });

      if (response.error) throw new Error(response.error.message);
      return response.data?.result;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  chat: async (request: ChatCompletionRequest) => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        responseType: 'json',
        query: { endpoint: 'chat' }
      });

      if (response.error) throw new Error(response.error.message);
      return response.data?.result;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  },

  complete: async (prompt: string, options = {}) => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: { prompt, ...options },
        responseType: 'json',
        query: { endpoint: 'completions' }
      });

      if (response.error) throw new Error(response.error.message);
      return response.data?.result;
    } catch (error) {
      console.error('Error in text completion:', error);
      throw error;
    }
  },

  getEmbeddings: async (request: EmbeddingRequest) => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        responseType: 'json',
        query: { endpoint: 'embeddings' }
      });

      if (response.error) throw new Error(response.error.message);
      return response.data?.result;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  }
};
