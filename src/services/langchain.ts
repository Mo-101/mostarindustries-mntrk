import { supabase } from "@/integrations/supabase/client";

export const langChainService = {
  chat: async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message }
      });

      if (error) throw error;
      return data.response;
    } catch (error) {
      console.error('Error in langchain service:', error);
      throw error;
    }
  }
};