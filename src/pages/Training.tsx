import { Book, BookOpen, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

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

  const handleStartModule = (moduleTitle: string) => {
    toast.success(`Starting module: ${moduleTitle}`);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Training Center</h1>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="modules">Training Modules</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          {modules.map((module, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {module.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Book className="h-5 w-5 text-blue-500" />
                    )}
                    <h3 className="text-xl font-semibold">{module.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{module.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                </div>
                <Button
                  variant={module.completed ? "outline" : "default"}
                  onClick={() => handleStartModule(module.title)}
                >
                  {module.completed ? "Review" : "Start"}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-semibold">Documentation & Guides</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">API Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guide to weather API endpoints and usage examples.
                </p>
                <Button variant="link" className="mt-2 p-0">
                  View Documentation →
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Model Training Guide</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guide to training and optimizing weather prediction models.
                </p>
                <Button variant="link" className="mt-2 p-0">
                  Read Guide →
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Training;