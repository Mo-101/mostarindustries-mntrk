
import { supabase } from "@/integrations/supabase/client";

export const aiService = {
  chat: async (message: string, type: 'analysis' | 'prediction' | 'general' = 'general') => {
    try {
      const { data, error } = await supabase.functions.invoke('deepseek-process', {
        body: { 
          query: message,
          type 
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        if (error.message.includes('429') || error.status === 429) {
          throw new Error('The service is experiencing high demand. Please try again in a few moments.');
        }
        throw error;
      }

      if (!data) {
        throw new Error('No response received from the chat function');
      }

      return data.result;
    } catch (error) {
      console.error('Error in AI service:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  }
};
