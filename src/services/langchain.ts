import { supabase } from "@/integrations/supabase/client";
import { Client } from "langsmith";
import { EvaluationResult } from "langsmith/evaluation";

const client = new Client();

export const langChainService = {
  chat: async (message: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message }
      });

      if (error) {
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