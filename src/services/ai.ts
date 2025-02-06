
import { supabase } from "@/integrations/supabase/client";

type ChatType = 'analysis' | 'prediction' | 'general';
type ResponseSchema = {
  type: "json_schema";
  json_schema: Record<string, any>;
};

export const aiService = {
  chat: async (
    message: string, 
    type: ChatType = 'general',
    schema?: ResponseSchema
  ) => {
    try {
      console.log('Sending chat request:', { message, type, schema });
      
      const response = await supabase.functions.invoke('deepseek-process', {
        body: { query: message, type, schema }
      });

      console.log('Raw response from edge function:', response);

      if (response.error) {
        console.error('Edge function error:', response.error);
        throw new Error(response.error.message || 'Error from edge function');
      }

      if (!response.data || !response.data.result) {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response received from the chat function');
      }

      console.log('Successfully received chat response:', response.data.result);
      console.log('Response source:', response.data.source);
      
      // If schema was provided, try to parse the response as JSON
      if (schema) {
        try {
          return JSON.parse(response.data.result);
        } catch (e) {
          console.error('Failed to parse JSON response:', e);
          throw new Error('Invalid JSON response from AI');
        }
      }
      
      return response.data.result;
      
    } catch (error) {
      console.error('Error in AI service:', error);
      
      if (error.message?.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to reach the AI service. Please check your connection.');
      } else if (error.message?.includes('429')) {
        throw new Error('The AI service is experiencing high demand. Please try again in a few moments.');
      } else if (error.message?.includes('401')) {
        throw new Error('Authentication error with AI service. Please check API key configuration.');
      }
      
      throw new Error(error.message || 'An unexpected error occurred while processing your request');
    }
  }
};
