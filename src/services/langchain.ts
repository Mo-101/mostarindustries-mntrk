import { supabase } from "@/integrations/supabase/client";
import { BaseMessageChunk } from "@langchain/core/messages";

export class LangChainService {
  private retryCount = 0;
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async chat(message: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message }
      });

      if (error) {
        console.error('Error in chat function:', error);
        if (error.message.includes('429') && this.retryCount < this.maxRetries) {
          this.retryCount++;
          await this.delay(this.retryDelay * this.retryCount);
          return this.chat(message);
        }
        throw error;
      }

      this.retryCount = 0; // Reset retry count on success
      return data.response;
    } catch (error) {
      console.error('Error in LangChain chat:', error);
      throw error;
    }
  }
}

export const langChainService = new LangChainService();