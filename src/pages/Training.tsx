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
      color: "themecyan",
      trend: {
        labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
        datasets: [{
          label: "Accuracy",
          data: [0.8, 0.85, 0.9, 0.92, 0.93],
          borderColor: "rgb(24, 254, 254)",
          backgroundColor: "rgba(24, 254, 254, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  const trainingMetrics = [
    {
      label: "Epoch",
      value: "15 / 100",
      color: "secondaryfluorescent",
    },
    {
      label: "Dataset Size",
      value: "50,000",
      color: "themegreen",
    },
    {
      label: "Loss Trend",
      value: "0.042",
      color: "themecyan",
      trend: {
        labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
        datasets: [{
          label: "Loss",
          data: [0.2, 0.15, 0.1, 0.07, 0.042],
          borderColor: "rgb(6, 247, 161)",
          backgroundColor: "rgba(6, 247, 161, 0.2)",
          fill: true,
        }],
      },
    }
  ];

  return (
    <div className="container mx-auto p-8 max-w-7xl bg-widgetcontentbg">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-themecyan" />
        <h1 className="text-3xl font-bold text-themewhite">Training Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <TrainingMetrics 
            title="Training Metrics" 
            metrics={accuracyMetrics} 
            className="border border-elementmainborder shadow-effect-halo-1"
          />
        </div>

        <div className="lg:col-span-6">
          <GlobeVisualization className="border border-elementmainborder shadow-effect-halo-2 mb-6" />
          
          <Tabs defaultValue="modules" className="space-y-6">
            <TabsList className="border border-elementcontentborder bg-transparent">
              <TabsTrigger 
                value="modules"
                className="data-[state=active]:bg-themecyan data-[state=active]:text-black"
              >
                Training Modules
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="data-[state=active]:bg-themecyan data-[state=active]:text-black"
              >
                Resources
              </TabsTrigger>
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
          <TrainingMetrics 
            title="Training Logs" 
            metrics={trainingMetrics} 
            className="border border-elementmainborder shadow-effect-halo-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Training;