import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingMetrics } from "@/components/training/TrainingMetrics";
import { GlobeVisualization } from "@/components/training/GlobeVisualization";
import { TrainingModules } from "@/components/training/TrainingModules";
import { ResourcesSection } from "@/components/training/ResourcesSection";

const Training = () => {
  const modules = [
    {
      title: "Introduction to Weather APIs",
      progress: 100,
      completed: true,
      description: "Learn the basics of weather data integration and API usage."
    },
    {
      title: "Model Training Fundamentals",
      progress: 75,
      completed: false,
      description: "Understanding core concepts of model training and optimization."
    },
    {
      title: "Advanced Data Processing",
      progress: 30,
      completed: false,
      description: "Deep dive into weather data processing and analysis techniques."
    }
  ];

  const accuracyMetrics = [
    {
      label: "Accuracy",
      value: "93%",
      color: "orange",
      trend: {
        labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
        datasets: [{
          label: "Accuracy",
          data: [0.8, 0.85, 0.9, 0.92, 0.93],
          borderColor: "#00b4d8",
          backgroundColor: "rgba(0, 180, 216, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  const trainingMetrics = [
    {
      label: "Epoch",
      value: "15 / 100",
      color: "orange",
    },
    {
      label: "Dataset Size",
      value: "50,000",
      color: "orange",
    },
    {
      label: "Loss Trend",
      value: "0.042",
      color: "orange",
      trend: {
        labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
        datasets: [{
          label: "Loss",
          data: [0.2, 0.15, 0.1, 0.07, 0.042],
          borderColor: "#ffa726",
          backgroundColor: "rgba(255, 167, 38, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Training Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <TrainingMetrics title="Training Metrics" metrics={accuracyMetrics} />
        </div>

        <div className="lg:col-span-6">
          <GlobeVisualization />
          
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList>
              <TabsTrigger value="modules">Training Modules</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-6">
              <TrainingModules modules={modules} />
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <ResourcesSection />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-3">
          <TrainingMetrics title="Training Logs" metrics={trainingMetrics} />
        </div>
      </div>
    </div>
  );
};

export default Training;