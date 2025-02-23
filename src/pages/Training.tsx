
import { BookOpen, Cpu, Database, Network, TrendingUp, LineChart, Brain, Link2 } from "lucide-react";
import { TrainingMetrics } from "@/components/training/TrainingMetrics";
import { GlobeVisualization } from "@/components/training/GlobeVisualization";
import { TrainingModules } from "@/components/training/TrainingModules";
import { Card } from "@/components/ui/card";

const Training = () => {
  const accuracyMetrics = [
    {
      label: "Model Accuracy",
      value: "93%",
      color: "themecyan",
      trend: {
        labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
        datasets: [{
          label: "Accuracy",
          data: [0.8, 0.85, 0.9, 0.92, 0.93],
          borderColor: "#06AAC5",
          backgroundColor: "rgba(6, 170, 197, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  const trainingMetrics = [
    {
      label: "Performance",
      value: "15 / 100",
      color: "secondaryfluorescent",
      trend: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [{
          label: "Performance",
          data: [0.2, 0.4, 0.6, 0.8, 0.9],
          borderColor: "#054455",
          backgroundColor: "rgba(5, 68, 85, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  const gridCards = [
    {
      title: "DeepSeek AI",
      icon: <Cpu className="w-8 h-8 text-[#06AAC5]" />,
      description: "Advanced AI model capabilities and features"
    },
    {
      title: "API Integration",
      icon: <Database className="w-8 h-8 text-[#06AAC5]" />,
      description: "Comprehensive API documentation and endpoints"
    },
    {
      title: "Agent System",
      icon: <Network className="w-8 h-8 text-[#06AAC5]" />,
      description: "Intelligent agent infrastructure and deployment"
    },
    {
      title: "Performance",
      icon: <LineChart className="w-8 h-8 text-[#06AAC5]" />,
      description: "System metrics and optimization analytics"
    },
    {
      title: "Growth & Learning",
      icon: <TrendingUp className="w-8 h-8 text-[#06AAC5]" />,
      description: "Continuous improvement and adaptation"
    },
    {
      title: "Knowledge Base",
      icon: <Brain className="w-8 h-8 text-[#06AAC5]" />,
      description: "Extensive training data and resources"
    }
  ];

  return (
    <div className="container mx-auto p-8 min-h-screen bg-[#081818]">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-[#06AAC5]" />
        <h1 className="text-3xl font-bold text-white">Training Center</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Charts */}
        <div className="col-span-3">
          <TrainingMetrics 
            title="Performance Metrics" 
            metrics={accuracyMetrics} 
            className="bg-[#04212C]/80 border-[#054455] backdrop-blur-lg animate-fade-in"
          />
        </div>

        {/* Center Content */}
        <div className="col-span-6 space-y-6">
          {/* Grid Cards */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            {gridCards.map((card, index) => (
              <Card 
                key={index}
                className="p-6 bg-[#04212C]/80 border-[#054455] backdrop-blur-lg hover:bg-[#054455]/80 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  {card.icon}
                  <div>
                    <h3 className="text-lg font-semibold text-[#06AAC5] mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Globe Visualization */}
          <GlobeVisualization className="h-[400px] rounded-lg border border-[#054455] bg-[#04212C]/80 backdrop-blur-lg animate-fade-in" />
        </div>

        {/* Right Charts */}
        <div className="col-span-3">
          <TrainingMetrics 
            title="Growth Analytics" 
            metrics={trainingMetrics} 
            className="bg-[#04212C]/80 border-[#054455] backdrop-blur-lg animate-fade-in"
          />
        </div>
      </div>

      {/* Bottom Integrations Section */}
      <div className="mt-6">
        <Card className="p-6 bg-[#04212C]/80 border-[#054455] backdrop-blur-lg animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-6 h-6 text-[#06AAC5]" />
            <h2 className="text-xl font-semibold text-white">Integrations</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <TrainingModules modules={[
              {
                title: "API Connection",
                progress: 100,
                completed: true,
                description: "Core API integration setup"
              },
              {
                title: "Data Pipeline",
                progress: 75,
                completed: false,
                description: "Data processing workflow"
              },
              {
                title: "Model Deployment",
                progress: 60,
                completed: false,
                description: "Model deployment process"
              },
              {
                title: "Monitoring",
                progress: 40,
                completed: false,
                description: "System monitoring setup"
              }
            ]} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Training;
