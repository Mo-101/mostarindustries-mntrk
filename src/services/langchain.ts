import { ChatOpenAI } from "@langchain/openai";
import { supabase } from "@/integrations/supabase/client";
import { BaseMessageChunk } from "@langchain/core/messages";

export class LangChainService {
  async chat(message: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message }
      });

      if (error) {
        console.error('Error in chat function:', error);
        throw error;
      }

      return data.response;
    } catch (error) {
      console.error('Error in LangChain chat:', error);
      throw error;
    }
  }
}

export const langChainService = new LangChainService();