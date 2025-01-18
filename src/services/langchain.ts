import { ChatOpenAI } from "@langchain/openai";
import { supabase } from "@/integrations/supabase/client";

export class LangChainService {
  private llm: ChatOpenAI;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
      modelName: "gpt-4", // Using GPT-4 for better results
    });
  }

  async chat(message: string): Promise<string> {
    try {
      const response = await this.llm.invoke(message);
      return response.content;
    } catch (error) {
      console.error('Error in LangChain chat:', error);
      throw error;
    }
  }
}

export const langChainService = new LangChainService();