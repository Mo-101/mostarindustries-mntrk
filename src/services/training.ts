
import { supabase } from "@/integrations/supabase/client";
import { TrainingModule, ModuleProgress, TrainingSession } from "@/types/training";

// Type assertion to help TypeScript understand our table names
const Tables = {
  TRAINING_MODULES: 'training_modules',
  TRAINING_SESSIONS: 'training_sessions',
  MODULE_PROGRESS: 'module_progress'
} as const;

export const trainingService = {
  // Fetch available training modules
  getModules: async (): Promise<TrainingModule[]> => {
    const { data, error } = await supabase
      .from(Tables.TRAINING_MODULES)
      .select('*')
      .order('order_index');

    if (error) throw error;
    return data || [];
  },

  // Start a new training session
  startSession: async (): Promise<TrainingSession> => {
    const { data, error } = await supabase
      .from(Tables.TRAINING_SESSIONS)
      .insert([{ 
        progress: 0,
        status: 'in_progress'
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from insert');
    return data;
  },

  // Update module progress
  updateModuleProgress: async (
    moduleId: string,
    sessionId: string,
    progress: number,
    status: ModuleProgress['status']
  ): Promise<ModuleProgress> => {
    const { data, error } = await supabase
      .from(Tables.MODULE_PROGRESS)
      .upsert({
        module_id: moduleId,
        session_id: sessionId,
        progress,
        status,
        last_activity_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from upsert');
    return data;
  },

  // Get progress for all modules in a session
  getSessionProgress: async (sessionId: string): Promise<ModuleProgress[]> => {
    const { data, error } = await supabase
      .from(Tables.MODULE_PROGRESS)
      .select('*')
      .eq('session_id', sessionId);

    if (error) throw error;
    return data || [];
  },

  // Complete a training session
  completeSession: async (sessionId: string): Promise<TrainingSession> => {
    const { data, error } = await supabase
      .from(Tables.TRAINING_SESSIONS)
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString(),
        progress: 100
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from update');
    return data;
  }
};
