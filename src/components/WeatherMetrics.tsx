import { Cloud, CloudRain, CloudSnow, CloudSun, CloudLightning, Sun, Wind, Tornado } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherMetric {
  type: string;
  value: number;
  unit: string;
}

interface WeatherMetricsProps {
  metrics: WeatherMetric[];
}

const getWeatherIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'rain':
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case 'snow':
      return <CloudSnow className="h-6 w-6 text-slate-300" />;
    case 'cloudy':
      return <Cloud className="h-6 w-6 text-slate-500" />;
    case 'partly cloudy':
      return <CloudSun className="h-6 w-6 text-amber-500" />;
    case 'thunderstorm':
      return <CloudLightning className="h-6 w-6 text-indigo-500" />;
    case 'clear':
      return <Sun className="h-6 w-6 text-amber-400" />;
    case 'wind':
      return <Wind className="h-6 w-6 text-slate-400" />;
    case 'tornado':
      return <Tornado className="h-6 w-6 text-slate-600" />;
    default:
      return <Cloud className="h-6 w-6 text-slate-500" />;
  }
};

export const WeatherMetrics = ({ metrics }: WeatherMetricsProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {getWeatherIcon(metric.type)}
            <div>
              <p className="text-sm font-medium">{metric.type}</p>
              <p className="text-2xl font-bold">
                {metric.value}
                <span className="text-sm ml-1">{metric.unit}</span>
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};