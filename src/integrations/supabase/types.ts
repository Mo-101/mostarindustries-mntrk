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
      api_training_status: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          last_validation_date: string | null
          model_name: string
          progress: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["api_status"]
          training_epochs: number | null
          training_metrics: Json | null
          updated_at: string | null
          validation_accuracy: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_validation_date?: string | null
          model_name: string
          progress?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["api_status"]
          training_epochs?: number | null
          training_metrics?: Json | null
          updated_at?: string | null
          validation_accuracy?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_validation_date?: string | null
          model_name?: string
          progress?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["api_status"]
          training_epochs?: number | null
          training_metrics?: Json | null
          updated_at?: string | null
          validation_accuracy?: number | null
        }
        Relationships: []
      }
      backtesting_results: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          losing_trades: number
          market_type: Database["public"]["Enums"]["market_type"]
          max_drawdown: number
          profit_factor: number
          sharpe_ratio: number
          start_date: string
          strategy_name: string
          symbol: string
          total_trades: number
          updated_at: string | null
          winning_trades: number
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          losing_trades: number
          market_type: Database["public"]["Enums"]["market_type"]
          max_drawdown: number
          profit_factor: number
          sharpe_ratio: number
          start_date: string
          strategy_name: string
          symbol: string
          total_trades: number
          updated_at?: string | null
          winning_trades: number
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          losing_trades?: number
          market_type?: Database["public"]["Enums"]["market_type"]
          max_drawdown?: number
          profit_factor?: number
          sharpe_ratio?: number
          start_date?: string
          strategy_name?: string
          symbol?: string
          total_trades?: number
          updated_at?: string | null
          winning_trades?: number
        }
        Relationships: []
      }
      historical_prices: {
        Row: {
          close: number
          created_at: string | null
          high: number
          id: string
          low: number
          open: number
          symbol: string
          timeframe: Database["public"]["Enums"]["timeframe"]
          timestamp: string
          volume: number
        }
        Insert: {
          close: number
          created_at?: string | null
          high: number
          id?: string
          low: number
          open: number
          symbol: string
          timeframe: Database["public"]["Enums"]["timeframe"]
          timestamp: string
          volume: number
        }
        Update: {
          close?: number
          created_at?: string | null
          high?: number
          id?: string
          low?: number
          open?: number
          symbol?: string
          timeframe?: Database["public"]["Enums"]["timeframe"]
          timestamp?: string
          volume?: number
        }
        Relationships: []
      }
      market_conditions: {
        Row: {
          condition: Database["public"]["Enums"]["market_condition"]
          confidence: number
          created_at: string | null
          detected_at: string
          id: string
          symbol: string
        }
        Insert: {
          condition: Database["public"]["Enums"]["market_condition"]
          confidence: number
          created_at?: string | null
          detected_at: string
          id?: string
          symbol: string
        }
        Update: {
          condition?: Database["public"]["Enums"]["market_condition"]
          confidence?: number
          created_at?: string | null
          detected_at?: string
          id?: string
          symbol?: string
        }
        Relationships: []
      }
      market_stats: {
        Row: {
          daily_pnl: number
          id: string
          market_sentiment: number
          open_positions: number
          portfolio_value: number
          symbol: string
          updated_at: string | null
          win_rate: number
        }
        Insert: {
          daily_pnl: number
          id?: string
          market_sentiment: number
          open_positions: number
          portfolio_value: number
          symbol: string
          updated_at?: string | null
          win_rate: number
        }
        Update: {
          daily_pnl?: number
          id?: string
          market_sentiment?: number
          open_positions?: number
          portfolio_value?: number
          symbol?: string
          updated_at?: string | null
          win_rate?: number
        }
        Relationships: []
      }
      portfolio_risk_metrics: {
        Row: {
          correlation_score: number
          created_at: string | null
          daily_drawdown: number
          free_margin: number
          id: string
          margin_level: number
          max_drawdown: number
          risk_per_trade: number
          total_equity: number
          updated_at: string | null
          used_margin: number
          user_id: string | null
        }
        Insert: {
          correlation_score: number
          created_at?: string | null
          daily_drawdown: number
          free_margin: number
          id?: string
          margin_level: number
          max_drawdown: number
          risk_per_trade: number
          total_equity: number
          updated_at?: string | null
          used_margin: number
          user_id?: string | null
        }
        Update: {
          correlation_score?: number
          created_at?: string | null
          daily_drawdown?: number
          free_margin?: number
          id?: string
          margin_level?: number
          max_drawdown?: number
          risk_per_trade?: number
          total_equity?: number
          updated_at?: string | null
          used_margin?: number
          user_id?: string | null
        }
        Relationships: []
      }
      secrets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      signals: {
        Row: {
          created_at: string | null
          entry_price: number
          id: string
          market_type: Database["public"]["Enums"]["market_type"]
          signal_type: string
          stop_loss: number | null
          symbol: string
          take_profit: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entry_price: number
          id?: string
          market_type: Database["public"]["Enums"]["market_type"]
          signal_type: string
          stop_loss?: number | null
          symbol: string
          take_profit?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entry_price?: number
          id?: string
          market_type?: Database["public"]["Enums"]["market_type"]
          signal_type?: string
          stop_loss?: number | null
          symbol?: string
          take_profit?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      trade_setups: {
        Row: {
          created_at: string | null
          entry_price: number
          expected_profit: number | null
          id: string
          leverage: number
          pair_id: string | null
          position_size: number
          stop_loss: number
          take_profit: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entry_price: number
          expected_profit?: number | null
          id?: string
          leverage: number
          pair_id?: string | null
          position_size: number
          stop_loss: number
          take_profit: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entry_price?: number
          expected_profit?: number | null
          id?: string
          leverage?: number
          pair_id?: string | null
          position_size?: number
          stop_loss?: number
          take_profit?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trade_setups_pair_id_fkey"
            columns: ["pair_id"]
            isOneToOne: false
            referencedRelation: "trading_pairs"
            referencedColumns: ["id"]
          },
        ]
      }
      trading_pairs: {
        Row: {
          base_asset: string
          created_at: string | null
          id: string
          is_active: boolean | null
          max_leverage: number | null
          min_leverage: number | null
          quote_asset: string
          symbol: string
        }
        Insert: {
          base_asset: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_leverage?: number | null
          min_leverage?: number | null
          quote_asset: string
          symbol: string
        }
        Update: {
          base_asset?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          max_leverage?: number | null
          min_leverage?: number | null
          quote_asset?: string
          symbol?: string
        }
        Relationships: []
      }
      trading_signals: {
        Row: {
          confidence: number
          created_at: string | null
          entry_price: number
          id: string
          market_type: Database["public"]["Enums"]["market_type"]
          potential_profit: number | null
          signal: Database["public"]["Enums"]["signal_type"]
          stop_loss: number
          symbol: string
          take_profit: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          confidence: number
          created_at?: string | null
          entry_price: number
          id?: string
          market_type?: Database["public"]["Enums"]["market_type"]
          potential_profit?: number | null
          signal: Database["public"]["Enums"]["signal_type"]
          stop_loss: number
          symbol: string
          take_profit: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          confidence?: number
          created_at?: string | null
          entry_price?: number
          id?: string
          market_type?: Database["public"]["Enums"]["market_type"]
          potential_profit?: number | null
          signal?: Database["public"]["Enums"]["signal_type"]
          stop_loss?: number
          symbol?: string
          take_profit?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      training_datasets: {
        Row: {
          created_at: string | null
          dataset_type: string
          features: Json
          id: string
          labels: Json
          model_name: string
          updated_at: string | null
          validation_split: number | null
        }
        Insert: {
          created_at?: string | null
          dataset_type: string
          features: Json
          id?: string
          labels: Json
          model_name: string
          updated_at?: string | null
          validation_split?: number | null
        }
        Update: {
          created_at?: string | null
          dataset_type?: string
          features?: Json
          id?: string
          labels?: Json
          model_name?: string
          updated_at?: string | null
          validation_split?: number | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          default_market: Database["public"]["Enums"]["market_type"] | null
          id: string
          preferred_symbols: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          default_market?: Database["public"]["Enums"]["market_type"] | null
          id?: string
          preferred_symbols?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          default_market?: Database["public"]["Enums"]["market_type"] | null
          id?: string
          preferred_symbols?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      api_status: "training" | "ready" | "error"
      market_condition: "trending" | "ranging" | "volatile"
      market_type: "crypto" | "forex"
      signal_type: "buy" | "sell" | "hold" | "neutral"
      timeframe: "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1d"
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
