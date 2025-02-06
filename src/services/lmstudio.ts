
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  model?: string;
}

export interface EmbeddingRequest {
  input: string | string[];
  model?: string;
}

export interface MastomysData {
  timestamp: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
    local_government_area: string;
  };
  population_data: {
    observed_population: number;
    population_density: number;
    trap_data: Array<{
      trap_id: string;
      coordinates: { latitude: number; longitude: number };
      species_count: number;
      sample_details: {
        average_weight: number;
        sex_ratio: string;
        viral_presence: string;
      };
    }>;
  };
  environmental_data: {
    temperature: number;
    humidity: number;
    rainfall: number;
    weather_condition: string;
    vegetation_index: number;
  };
  ecological_trends: {
    population_change: string;
    migration_patterns: string;
    habitat_change: string;
  };
  risk_assessment: {
    lassa_risk_level: string;
    outbreak_probability: string;
    hotspot_potential: string;
  };
  api_integration_status: {
    supabase: string;
    deepseek: string;
    openweather: string;
    nigeria_cdc: string;
  };
}

// Predefined system prompts for different analysis types
const SYSTEM_PROMPTS = {
  MOVEMENT_ANALYSIS: `You are an expert system analyzing Mastomys Natalensis movement patterns. 
  Consider ecological factors, seasonal changes, and historical data to provide detailed scientific insights.`,
  
  OUTBREAK_PREDICTION: `You are a specialized system for Lassa fever outbreak prediction.
  Analyze Mastomys population data, environmental conditions, and historical outbreak patterns to assess risks.`,
  
  ECOLOGICAL_ASSESSMENT: `You are an environmental analysis system tracking Mastomys habitats.
  Evaluate climate data, vegetation patterns, and human settlement proximity for comprehensive habitat assessment.`
};

export const lmStudioService = {
  getModels: async () => {
    try {
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: {},
        query: { endpoint: 'models' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Available models:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  chat: async (request: ChatCompletionRequest) => {
    try {
      console.log('Sending chat request:', request);
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        query: { endpoint: 'chat' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Chat response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  },

  complete: async (prompt: string, options = {}) => {
    try {
      console.log('Sending completion request:', { prompt, ...options });
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: { prompt, ...options },
        query: { endpoint: 'completions' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Completion response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error in text completion:', error);
      throw error;
    }
  },

  getEmbeddings: async (request: EmbeddingRequest) => {
    try {
      console.log('Requesting embeddings for:', request);
      const response = await supabase.functions.invoke('lmstudio-process', {
        body: request,
        query: { endpoint: 'embeddings' }
      });

      if (response.error) throw new Error(response.error.message);
      console.log('Embeddings response:', response.data?.result);
      return response.data?.result;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw error;
    }
  },

  // Specialized methods for Mastomys tracking
  generateMastomysData: async (): Promise<MastomysData> => {
    try {
      const weatherResponse = await supabase.functions.invoke('weather-data', {
        body: { latitude: 9.0820, longitude: 8.6753 }
      });

      if (weatherResponse.error) throw new Error(weatherResponse.error.message);
      const weatherData = weatherResponse.data;

      const data: MastomysData = {
        timestamp: new Date().toISOString(),
        location: {
          latitude: 9.0820,
          longitude: 8.6753,
          region: "FCT",
          local_government_area: "Abuja Municipal"
        },
        population_data: {
          observed_population: 150,
          population_density: 25,
          trap_data: [
            {
              trap_id: "T001",
              coordinates: { latitude: 9.0815, longitude: 8.6748 },
              species_count: 5,
              sample_details: {
                average_weight: 120,
                sex_ratio: "60% Female, 40% Male",
                viral_presence: "Negative"
              }
            }
          ]
        },
        environmental_data: {
          temperature: weatherData.temperature || 28,
          humidity: weatherData.humidity || 70,
          rainfall: weatherData.rainfall || 5,
          weather_condition: weatherData.condition || "Sunny",
          vegetation_index: 0.75
        },
        ecological_trends: {
          population_change: "+10%",
          migration_patterns: "North-East",
          habitat_change: "Deforestation detected"
        },
        risk_assessment: {
          lassa_risk_level: "Medium",
          outbreak_probability: "30%",
          hotspot_potential: "High"
        },
        api_integration_status: {
          supabase: "Connected",
          deepseek: "Connected",
          openweather: "Connected",
          nigeria_cdc: "Pending"
        }
      };

      return data;
    } catch (error) {
      console.error('Error generating Mastomys data:', error);
      throw error;
    }
  },

  analyzeMovementPattern: async (movementData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.MOVEMENT_ANALYSIS },
        { role: 'user', content: `Analyze the following Mastomys movement data: ${JSON.stringify(movementData)}` }
      ],
      temperature: 0.3 // Lower temperature for more focused analysis
    });
  },

  predictOutbreakRisk: async (locationData: any, environmentalData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.OUTBREAK_PREDICTION },
        { role: 'user', content: `Assess outbreak risk based on location: ${JSON.stringify(locationData)} and environmental conditions: ${JSON.stringify(environmentalData)}` }
      ],
      temperature: 0.2 // Low temperature for more conservative predictions
    });
  },

  assessHabitatSuitability: async (environmentalData: any) => {
    return lmStudioService.chat({
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.ECOLOGICAL_ASSESSMENT },
        { role: 'user', content: `Evaluate habitat suitability based on: ${JSON.stringify(environmentalData)}` }
      ],
      temperature: 0.3
    });
  },

  // Real-time monitoring setup
  setupRealtimeMonitoring: async () => {
    const channel = supabase
      .channel('mastomys-tracking')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'mastomys_observations' },
        (payload) => {
          console.log('Real-time update:', payload);
          // Handle different types of updates
          switch (payload.eventType) {
            case 'INSERT':
              console.log('New observation:', payload.new);
              break;
            case 'UPDATE':
              console.log('Updated observation:', payload.new);
              break;
            case 'DELETE':
              console.log('Deleted observation:', payload.old);
              break;
          }
        }
      )
      .subscribe();

    return channel;
  }
};
