import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://fdezrtfnjsweyoborhwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZXpydGZuanN3ZXlvYm9yaHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTkwMzAsImV4cCI6MjA0ODY3NTAzMH0.Eaqr65G0feAYC0y4aWD_9HoGDRdrTCuXYuNgLoAQ9-c";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Add a health check function to verify connection
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('colonies').select('count');
    if (error) throw error;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};