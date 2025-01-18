import { supabase } from "@/integrations/supabase/client";
import { Client } from "langsmith";
import { EvaluationResult } from "langsmith/evaluation";

const client = new Client();

export const langChainService = {
  chat: async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message },
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

      return data.response;
    } catch (error) {
      console.error('Error in langchain service:', error);
      if (error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  },

  evaluateResponse: async (input: string, expectedOutput: string): Promise<EvaluationResult> => {
    const exactMatch = async ({
      outputs,
      referenceOutputs,
    }: {
      outputs?: Record<string, any>;
      referenceOutputs?: Record<string, any>;
    }): Promise<EvaluationResult> => {
      return {
        key: "exact_match",
        score: outputs?.response === referenceOutputs?.response ? 1 : 0,
      };
    };

    return await exactMatch({
      outputs: { response: await langChainService.chat(input) },
      referenceOutputs: { response: expectedOutput }
    });
  }
};