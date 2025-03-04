
import { Progress } from "@/components/ui/progress";

export function ApiStatusPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#1C2333] p-3 rounded-md">
        <div className="flex items-center">
          <div className="text-sm">System Status</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-500">Online</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Response Time</span>
          <span className="font-mono">584ms</span>
        </div>
        <div className="h-1.5 w-full bg-[#1C2333] rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 bg-green-500"></div>
            <div className="w-1/3 bg-yellow-500"></div>
            <div className="w-1/3 bg-red-500 opacity-20"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#1C2333] p-3 rounded-md">
        <div className="text-sm">Connection Status</div>
        <div className="text-xs text-gray-400 mt-1">Connected to Supabase</div>
      </div>
    </div>
  );
}
