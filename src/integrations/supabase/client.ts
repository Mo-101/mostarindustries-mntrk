// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fdezrtfnjsweyoborhwg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZXpydGZuanN3ZXlvYm9yaHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwOTkwMzAsImV4cCI6MjA0ODY3NTAzMH0.Eaqr65G0feAYC0y4aWD_9HoGDRdrTCuXYuNgLoAQ9-c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);