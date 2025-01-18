import { supabase } from "@/integrations/supabase/client";

export const langChainService = {
  chat: async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message }
      });

      if (error) {
        // Check if it's a rate limit error
        if (error.message.includes('429') || error.status === 429) {
          throw new Error('The service is experiencing high demand. Please try again in a few moments.');
        }
        throw error;
      }
      return data.response;
    } catch (error) {
      console.error('Error in langchain service:', error);
      throw error;
    }
  }
};