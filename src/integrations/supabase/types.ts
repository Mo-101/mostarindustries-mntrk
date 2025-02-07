export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      adaptive_learning_configs: {
        Row: {
          config_name: string
          created_at: string | null
          id: number
          parameters: Json
          updated_at: string | null
        }
        Insert: {
          config_name: string
          created_at?: string | null
          id?: number
          parameters: Json
          updated_at?: string | null
        }
        Update: {
          config_name?: string
          created_at?: string | null
          id?: number
          parameters?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      anomaly_detections: {
        Row: {
          anomaly_type: string
          data_source: string
          details: Json
          detected_at: string | null
          id: number
        }
        Insert: {
          anomaly_type: string
          data_source: string
          details: Json
          detected_at?: string | null
          id?: number
        }
        Update: {
          anomaly_type?: string
          data_source?: string
          details?: Json
          detected_at?: string | null
          id?: number
        }
        Relationships: []
      }
      cache_configs: {
        Row: {
          cache_key: string
          cache_value: Json
          expires_at: string | null
          id: number
        }
        Insert: {
          cache_key: string
          cache_value: Json
          expires_at?: string | null
          id?: number
        }
        Update: {
          cache_key?: string
          cache_value?: Json
          expires_at?: string | null
          id?: number
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          model: string
          prompt: string
          response: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          model: string
          prompt: string
          response: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          model?: string
          prompt?: string
          response?: string
          user_id?: string | null
        }
        Relationships: []
      }
      colonies: {
        Row: {
          colony_name: string
          created_at: string | null
          id: number
          location: Json
        }
        Insert: {
          colony_name: string
          created_at?: string | null
          id?: number
          location: Json
        }
        Update: {
          colony_name?: string
          created_at?: string | null
          id?: number
          location?: Json
        }
        Relationships: []
      }
      colony_diseases: {
        Row: {
          colony_id: number
          detected_at: string | null
          disease_id: number
          id: number
          severity: string | null
        }
        Insert: {
          colony_id: number
          detected_at?: string | null
          disease_id: number
          id?: number
          severity?: string | null
        }
        Update: {
          colony_id?: number
          detected_at?: string | null
          disease_id?: number
          id?: number
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colony_diseases_colony_id_fkey"
            columns: ["colony_id"]
            isOneToOne: false
            referencedRelation: "colonies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colony_diseases_disease_id_fkey"
            columns: ["disease_id"]
            isOneToOne: false
            referencedRelation: "diseases"
            referencedColumns: ["id"]
          },
        ]
      }
      context_aware_predictions: {
        Row: {
          id: number
          predicted_at: string | null
          predicted_value: string
          prediction_context: Json
        }
        Insert: {
          id?: number
          predicted_at?: string | null
          predicted_value: string
          prediction_context: Json
        }
        Update: {
          id?: number
          predicted_at?: string | null
          predicted_value?: string
          prediction_context?: Json
        }
        Relationships: []
      }
      data_augmentation: {
        Row: {
          augmentation_method: string
          augmented_data: Json
          id: number
          original_data_id: number
        }
        Insert: {
          augmentation_method: string
          augmented_data: Json
          id?: number
          original_data_id: number
        }
        Update: {
          augmentation_method?: string
          augmented_data?: Json
          id?: number
          original_data_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "data_augmentation_original_data_id_fkey"
            columns: ["original_data_id"]
            isOneToOne: false
            referencedRelation: "environmental_data"
            referencedColumns: ["id"]
          },
        ]
      }
      data_quality_reports: {
        Row: {
          generated_at: string | null
          id: number
          report_details: Json
        }
        Insert: {
          generated_at?: string | null
          id?: number
          report_details: Json
        }
        Update: {
          generated_at?: string | null
          id?: number
          report_details?: Json
        }
        Relationships: []
      }
      data_transformations: {
        Row: {
          applied_at: string | null
          id: number
          transformation_details: Json
          transformation_name: string
        }
        Insert: {
          applied_at?: string | null
          id?: number
          transformation_details: Json
          transformation_name: string
        }
        Update: {
          applied_at?: string | null
          id?: number
          transformation_details?: Json
          transformation_name?: string
        }
        Relationships: []
      }
      detection_patterns: {
        Row: {
          confidence: number
          created_at: string | null
          detection_date: string
          id: number
          location: Json
        }
        Insert: {
          confidence: number
          created_at?: string | null
          detection_date: string
          id?: number
          location: Json
        }
        Update: {
          confidence?: number
          created_at?: string | null
          detection_date?: string
          id?: number
          location?: Json
        }
        Relationships: []
      }
      diseases: {
        Row: {
          description: string | null
          disease_name: string
          id: number
          severity: string | null
        }
        Insert: {
          description?: string | null
          disease_name: string
          id?: number
          severity?: string | null
        }
        Update: {
          description?: string | null
          disease_name?: string
          id?: number
          severity?: string | null
        }
        Relationships: []
      }
      environmental_data: {
        Row: {
          data_source: string
          data_value: Json
          id: number
          recorded_at: string | null
        }
        Insert: {
          data_source: string
          data_value: Json
          id?: number
          recorded_at?: string | null
        }
        Update: {
          data_source?: string
          data_value?: Json
          id?: number
          recorded_at?: string | null
        }
        Relationships: []
      }
      habitat_predictions: {
        Row: {
          habitat_details: Json
          id: number
          predicted_at: string | null
          prediction_value: string
        }
        Insert: {
          habitat_details: Json
          id?: number
          predicted_at?: string | null
          prediction_value: string
        }
        Update: {
          habitat_details?: Json
          id?: number
          predicted_at?: string | null
          prediction_value?: string
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          content: string
          created_at: string | null
          id: number
          tags: string[] | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: number
          tags?: string[] | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: number
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      lassa_fever_data: {
        Row: {
          address_lga: string | null
          address_state: string | null
          address_ward: string | null
          city: string | null
          id: number
          latitude: string | null
          longitude: string | null
          street: string | null
        }
        Insert: {
          address_lga?: string | null
          address_state?: string | null
          address_ward?: string | null
          city?: string | null
          id: number
          latitude?: string | null
          longitude?: string | null
          street?: string | null
        }
        Update: {
          address_lga?: string | null
          address_state?: string | null
          address_ward?: string | null
          city?: string | null
          id?: number
          latitude?: string | null
          longitude?: string | null
          street?: string | null
        }
        Relationships: []
      }
      mastomys_location_data: {
        Row: {
          country_country: string | null
          id: number
          id_id: number | null
          latitude: number | null
          locality_community: string | null
          location: string | null
          longitude: number | null
          state_province: string | null
        }
        Insert: {
          country_country?: string | null
          id: number
          id_id?: number | null
          latitude?: number | null
          locality_community?: string | null
          location?: string | null
          longitude?: number | null
          state_province?: string | null
        }
        Update: {
          country_country?: string | null
          id?: number
          id_id?: number | null
          latitude?: number | null
          locality_community?: string | null
          location?: string | null
          longitude?: number | null
          state_province?: string | null
        }
        Relationships: []
      }
      model_datasets: {
        Row: {
          data_format: string
          dataset_name: string
          description: string | null
          id: number
        }
        Insert: {
          data_format: string
          dataset_name: string
          description?: string | null
          id?: number
        }
        Update: {
          data_format?: string
          dataset_name?: string
          description?: string | null
          id?: number
        }
        Relationships: []
      }
      model_features: {
        Row: {
          data_type: string
          description: string | null
          feature_name: string
          id: number
        }
        Insert: {
          data_type: string
          description?: string | null
          feature_name: string
          id?: number
        }
        Update: {
          data_type?: string
          description?: string | null
          feature_name?: string
          id?: number
        }
        Relationships: []
      }
      models: {
        Row: {
          description: string | null
          id: number
          model_name: string
          version: string
        }
        Insert: {
          description?: string | null
          id?: number
          model_name: string
          version: string
        }
        Update: {
          description?: string | null
          id?: number
          model_name?: string
          version?: string
        }
        Relationships: []
      }
      module_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          last_activity_at: string | null
          module_id: string | null
          progress: number | null
          session_id: string | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          module_id?: string | null
          progress?: number | null
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          module_id?: string | null
          progress?: number | null
          session_id?: string | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_progress_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      movement_predictions: {
        Row: {
          id: number
          movement_details: Json
          predicted_at: string | null
          predicted_value: string
        }
        Insert: {
          id?: number
          movement_details: Json
          predicted_at?: string | null
          predicted_value: string
        }
        Update: {
          id?: number
          movement_details?: Json
          predicted_at?: string | null
          predicted_value?: string
        }
        Relationships: []
      }
      outbreak_predictions: {
        Row: {
          id: number
          predicted_at: string | null
          predicted_outbreak: Json
          region: string
        }
        Insert: {
          id?: number
          predicted_at?: string | null
          predicted_outbreak: Json
          region: string
        }
        Update: {
          id?: number
          predicted_at?: string | null
          predicted_outbreak?: Json
          region?: string
        }
        Relationships: []
      }
      points: {
        Row: {
          id: number
          point_details: Json
        }
        Insert: {
          id?: number
          point_details: Json
        }
        Update: {
          id?: number
          point_details?: Json
        }
        Relationships: []
      }
      predictions: {
        Row: {
          id: number
          predicted_at: string | null
          predicted_value: string
          prediction_details: Json
        }
        Insert: {
          id?: number
          predicted_at?: string | null
          predicted_value: string
          prediction_details: Json
        }
        Update: {
          id?: number
          predicted_at?: string | null
          predicted_value?: string
          prediction_details?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: number
          profile_data: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          profile_data: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          profile_data?: Json
          user_id?: string
        }
        Relationships: []
      }
      rate_limit_configs: {
        Row: {
          config_name: string
          id: number
          limit_value: number
        }
        Insert: {
          config_name: string
          id?: number
          limit_value: number
        }
        Update: {
          config_name?: string
          id?: number
          limit_value?: number
        }
        Relationships: []
      }
      remote_sensing_data: {
        Row: {
          data_source: string
          id: number
          recorded_at: string | null
          sensing_data: Json
        }
        Insert: {
          data_source: string
          id?: number
          recorded_at?: string | null
          sensing_data: Json
        }
        Update: {
          data_source?: string
          id?: number
          recorded_at?: string | null
          sensing_data?: Json
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          assessment_details: Json
          id: number
          risk_level: string
        }
        Insert: {
          assessment_details: Json
          id?: number
          risk_level: string
        }
        Update: {
          assessment_details?: Json
          id?: number
          risk_level?: string
        }
        Relationships: []
      }
      secrets: {
        Row: {
          id: number
          secret_key: string
          secret_value: string
        }
        Insert: {
          id?: number
          secret_key: string
          secret_value: string
        }
        Update: {
          id?: number
          secret_key?: string
          secret_value?: string
        }
        Relationships: []
      }
      sightings: {
        Row: {
          id: number
          recorded_at: string | null
          sighting_details: Json
        }
        Insert: {
          id?: number
          recorded_at?: string | null
          sighting_details: Json
        }
        Update: {
          id?: number
          recorded_at?: string | null
          sighting_details?: Json
        }
        Relationships: []
      }
      training_feedback: {
        Row: {
          created_at: string | null
          feedback_data: Json
          id: number
          prediction_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_data: Json
          id?: number
          prediction_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_data?: Json
          id?: number
          prediction_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "training_feedback_prediction_id_fkey"
            columns: ["prediction_id"]
            isOneToOne: false
            referencedRelation: "predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      training_metrics: {
        Row: {
          id: number
          metric_name: string
          metric_value: Json
          recorded_at: string | null
        }
        Insert: {
          id?: number
          metric_name: string
          metric_value: Json
          recorded_at?: string | null
        }
        Update: {
          id?: number
          metric_name?: string
          metric_value?: Json
          recorded_at?: string | null
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          order_index: number | null
          prerequisites: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          order_index?: number | null
          prerequisites?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          order_index?: number | null
          prerequisites?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_pipeline_configs: {
        Row: {
          config_name: string
          created_at: string | null
          id: number
          parameters: Json
          updated_at: string | null
        }
        Insert: {
          config_name: string
          created_at?: string | null
          id?: number
          parameters: Json
          updated_at?: string | null
        }
        Update: {
          config_name?: string
          created_at?: string | null
          id?: number
          parameters?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_module: string | null
          id: string
          progress: number | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_module?: string | null
          id?: string
          progress?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_module?: string | null
          id?: string
          progress?: number | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vision_analysis: {
        Row: {
          analysis_details: Json
          analyzed_at: string | null
          id: number
        }
        Insert: {
          analysis_details: Json
          analyzed_at?: string | null
          id?: number
        }
        Update: {
          analysis_details?: Json
          analyzed_at?: string | null
          id?: number
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          cloud_cover_percent: number | null
          created_at: string | null
          description: string | null
          dew_point_celsius: number | null
          feels_like_celsius: number | null
          id: number
          latitude: number
          location: Json
          location_point: unknown
          longitude: number
          max_temp_celsius: number | null
          min_temp_celsius: number | null
          precipitation_mm: number | null
          precipitation_probability: number | null
          pressure_hpa: number | null
          relative_humidity_percent: number | null
          sea_level_pressure_hpa: number | null
          soil_moisture_percent: number | null
          soil_temperature_celsius: number | null
          source: string | null
          station_id: string
          temperature_celsius: number | null
          timestamp: string
          updated_at: string | null
          uv_index: number | null
          visibility_meters: number | null
          weather_conditions: string | null
          weather_icon: string | null
          wind_direction_degrees: number | null
          wind_gust_ms: number | null
          wind_speed_ms: number | null
        }
        Insert: {
          cloud_cover_percent?: number | null
          created_at?: string | null
          description?: string | null
          dew_point_celsius?: number | null
          feels_like_celsius?: number | null
          id?: number
          latitude: number
          location: Json
          location_point: unknown
          longitude: number
          max_temp_celsius?: number | null
          min_temp_celsius?: number | null
          precipitation_mm?: number | null
          precipitation_probability?: number | null
          pressure_hpa?: number | null
          relative_humidity_percent?: number | null
          sea_level_pressure_hpa?: number | null
          soil_moisture_percent?: number | null
          soil_temperature_celsius?: number | null
          source?: string | null
          station_id: string
          temperature_celsius?: number | null
          timestamp: string
          updated_at?: string | null
          uv_index?: number | null
          visibility_meters?: number | null
          weather_conditions?: string | null
          weather_icon?: string | null
          wind_direction_degrees?: number | null
          wind_gust_ms?: number | null
          wind_speed_ms?: number | null
        }
        Update: {
          cloud_cover_percent?: number | null
          created_at?: string | null
          description?: string | null
          dew_point_celsius?: number | null
          feels_like_celsius?: number | null
          id?: number
          latitude?: number
          location?: Json
          location_point?: unknown
          longitude?: number
          max_temp_celsius?: number | null
          min_temp_celsius?: number | null
          precipitation_mm?: number | null
          precipitation_probability?: number | null
          pressure_hpa?: number | null
          relative_humidity_percent?: number | null
          sea_level_pressure_hpa?: number | null
          soil_moisture_percent?: number | null
          soil_temperature_celsius?: number | null
          source?: string | null
          station_id?: string
          temperature_celsius?: number | null
          timestamp?: string
          updated_at?: string | null
          uv_index?: number | null
          visibility_meters?: number | null
          weather_conditions?: string | null
          weather_icon?: string | null
          wind_direction_degrees?: number | null
          wind_gust_ms?: number | null
          wind_speed_ms?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_anomalies_by_confidence: {
        Args: {
          p_min_confidence: number
        }
        Returns: {
          anomaly_type: string
          data_source: string
          details: Json
          detected_at: string | null
          id: number
        }[]
      }
      insert_movement_prediction: {
        Args: {
          p_movement_details: Json
          p_predicted_value: string
        }
        Returns: undefined
      }
      start_training_process: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_weather: {
        Args: {
          p_station_id: string
          p_temperature: number
          p_humidity: number
          p_weather_conditions: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
