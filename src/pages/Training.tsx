import { Book, BookOpen, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Training = () => {
  const globeRef = useRef<HTMLDivElement>(null);

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

  const accuracyData = {
    labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
    datasets: [
      {
        label: "Accuracy",
        data: [0.8, 0.85, 0.9, 0.92, 0.93],
        borderColor: "#00b4d8",
        backgroundColor: "rgba(0, 180, 216, 0.2)",
        fill: true,
      },
    ],
  };

  const lossData = {
    labels: ["Epoch 1", "Epoch 2", "Epoch 3", "Epoch 4", "Epoch 5"],
    datasets: [
      {
        label: "Loss",
        data: [0.2, 0.15, 0.1, 0.07, 0.042],
        borderColor: "#ffa726",
        backgroundColor: "rgba(255, 167, 38, 0.2)",
        fill: true,
      },
    ],
  };

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

  useEffect(() => {
    if (!globeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, globeRef.current.clientWidth / globeRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    globeRef.current.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      wireframe: true,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    camera.position.z = 2;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      globeRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const handleStartModule = (moduleTitle: string) => {
    toast.success(`Starting module: ${moduleTitle}`);
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Training Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <h3 className="text-xl font-semibold text-primary mb-4">Training Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Accuracy</h4>
                <p className="text-2xl font-bold">93%</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Loss</h4>
                <p className="text-2xl font-bold">0.042</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Accuracy Trend</h4>
                <div className="h-[200px]">
                  <Line data={accuracyData} options={chartOptions} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6">
          <div ref={globeRef} className="w-full h-[300px] mb-6 rounded-lg overflow-hidden" />
          
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

        {/* Right Panel */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <h3 className="text-xl font-semibold text-primary mb-4">Training Logs</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Epoch</h4>
                <p className="text-2xl font-bold">15 / 100</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Dataset Size</h4>
                <p className="text-2xl font-bold">50,000</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-orange-400">Loss Trend</h4>
                <div className="h-[200px]">
                  <Line data={lossData} options={chartOptions} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training;