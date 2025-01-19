import { Line } from "react-chartjs-2";
import { Card } from "@/components/ui/card";

interface MetricsData {
  label: string;
  value: string;
  trend: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  };
  color: string;
}

interface TrainingMetricsProps {
  title: string;
  metrics: MetricsData[];
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
};

export const TrainingMetrics = ({ title, metrics }: TrainingMetricsProps) => {
  return (
    <Card className="p-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <h4 className={`font-medium mb-2 text-${metric.color}-400`}>{metric.label}</h4>
            <p className="text-2xl font-bold">{metric.value}</p>
            {metric.trend && (
              <div className="h-[200px]">
                <Line data={metric.trend} options={chartOptions} />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};