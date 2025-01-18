import { supabase } from "@/integrations/supabase/client";

export type ProcessType = 'analysis' | 'prediction' | 'query';

export const processWithLangChain = async (query: string, type: ProcessType = 'query') => {
  try {
    const { data, error } = await supabase.functions.invoke('langchain-process', {
      body: { query, type }
    });

    if (error) throw error;
    return data.result;
  } catch (error) {
    console.error('LangChain processing error:', error);
    throw error;
  }
};