
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from "@/components/ui/progress";

export function ApiStatusPanel() {
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [responseTime, setResponseTime] = useState(0);
  const [lastChecked, setLastChecked] = useState<string>('');

  useEffect(() => {
    const checkStatus = async () => {
      const startTime = Date.now();
      try {
        const { data } = await supabase.from('system_metrics').select('*').limit(1);
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        setStatus('online');
        setLastChecked(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Supabase connection error:', error);
        setStatus('offline');
        setLastChecked(new Date().toLocaleTimeString());
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm">API Status</div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={status === 'online' ? 'text-green-500' : 'text-red-500'}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="flex justify-between mb-1">
          <span className="text-sm">Response Time</span>
          <span className="text-sm font-mono">{responseTime}ms</span>
        </div>
        <Progress 
          value={Math.min(responseTime / 5, 100)} 
          className="h-1.5 bg-[#0D1326]" 
          style={{
            "--progress-indicator-color": responseTime < 200 ? "#10B981" : responseTime < 500 ? "#EAB308" : "#EF4444"
          } as React.CSSProperties}
        />
      </div>
      
      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="text-sm">Endpoints</div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {['Mastomys API', 'Storage API', 'Auth API'].map((endpoint) => (
            <div key={endpoint} className="flex items-center justify-between text-xs">
              <span>{endpoint}</span>
              <span className="text-green-400">Available</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-gray-400">
        Last checked: {lastChecked || 'N/A'}
      </div>
    </div>
  );
}
