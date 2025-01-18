import { ChatOpenAI } from "@langchain/openai";
import { supabase } from "@/integrations/supabase/client";
import { BaseMessageChunk } from "@langchain/core/messages";

export class LangChainService {
  private llm: ChatOpenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key not found. Please set it in your Supabase secrets.");
    }

    this.llm = new ChatOpenAI({
      openAIApiKey: apiKey,
      temperature: 0.7,
      modelName: "gpt-4o-mini", // Using the recommended fast and cheap model
    });
  }

  async chat(message: string): Promise<string> {
    try {
      const response = await this.llm.invoke(message);
      if (typeof response.content === 'string') {
        return response.content;
      }
      // Handle array of content by concatenating text content
      return response.content
        .filter(content => 'text' in content)
        .map(content => ('text' in content ? content.text : ''))
        .join(' ');
    } catch (error) {
      console.error('Error in LangChain chat:', error);
      throw error;
    }
  }
}

export const langChainService = new LangChainService();