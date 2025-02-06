
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

// Predefined system prompts for different analysis types
const SYSTEM_PROMPTS = {
  MOVEMENT_ANALYSIS: `You are an expert system analyzing Mastomys Natalensis movement patterns. 
  Consider ecological factors, seasonal changes, and historical data to provide detailed scientific insights.`,
  
  OUTBREAK_PREDICTION: `You are a specialized system for Lassa fever outbreak prediction.
  Analyze Mastomys population data, environmental conditions, and historical outbreak patterns to assess risks.`,
  
  ECOLOGICAL_ASSESSMENT: `You are an environmental analysis system tracking Mastomys habitats.
  Evaluate climate data, vegetation patterns, and human settlement proximity for comprehensive habitat assessment.`
};

export const lmStudioService = {
  getModels: async () => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: {},
        responseType: 'json',
        query: { endpoint: 'models' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Available models:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  chat: async (request: ChatCompletionRequest) => {
    try {
      console.log('Sending chat request:', request);
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        responseType: 'json',
        query: { endpoint: 'chat' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Chat response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  },

  complete: async (prompt: string, options = {}) => {
    try {
      console.log('Sending completion request:', { prompt, ...options });
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: { prompt, ...options },
        responseType: 'json',
        query: { endpoint: 'completions' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Completion response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error in text completion:', error);
      throw error;
    }
  },

  getEmbeddings: async (request: EmbeddingRequest) => {
    try {
      console.log('Requesting embeddings for:', request);
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        responseType: 'json',
        query: { endpoint: 'embeddings' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Embeddings response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  },

  // Specialized methods for Mastomys tracking
  analyzeMovementPattern: async (movementData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.MOVEMENT_ANALYSIS },
        { role: 'user', content: `Analyze the following Mastomys movement data: ${JSON.stringify(movementData)}` }
      ],
      temperature: 0.3 // Lower temperature for more focused analysis
    });
  },

  predictOutbreakRisk: async (locationData: any, environmentalData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.OUTBREAK_PREDICTION },
        { role: 'user', content: `Assess outbreak risk based on location: ${JSON.stringify(locationData)} and environmental conditions: ${JSON.stringify(environmentalData)}` }
      ],
      temperature: 0.2 // Low temperature for more conservative predictions
    });
  },

  assessHabitatSuitability: async (environmentalData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.ECOLOGICAL_ASSESSMENT },
        { role: 'user', content: `Evaluate habitat suitability based on: ${JSON.stringify(environmentalData)}` }
      ],
      temperature: 0.3
    });
  }
};
