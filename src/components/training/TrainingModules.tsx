import { Book, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TrainingModule {
  title: string;
  progress: number;
  completed: boolean;
  description: string;
}

interface TrainingModulesProps {
  modules: TrainingModule;
}

export const TrainingModules = ({ modules }: TrainingModulesProps) => {
  const handleStartModule = (moduleTitle: string) => {
    toast.success(`Starting module: ${moduleTitle}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid layout */}
      {modules.map((module, index) => (
        <Card key={index} className="bg-card rounded-lg p-6 dark:bg-zinc-800"> {/* Dark mode support */}
          <h3 className="text-lg font-semibold mb-4 text-white">{module.title}</h3> {/* White title */}
          <div className="space-y-3">
            <p className="text-muted-foreground dark:text-zinc-400">{module.description}</p> {/* Dark mode text */}
            <div className="flex justify-between items-center"> {/* Align items vertically */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 dark:text-zinc-500"> {/* Dark mode text */}
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2 mt-1 dark:bg-zinc-700" /> {/* Dark mode progress */}
              </div>
              <Button
                variant={module.completed? "outline": "default"}
                onClick={() => handleStartModule(module.title)}
                className={`dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white ${module.completed? 'dark:border-zinc-500': ''}`} // Dark mode buttons
              >
                {module.completed? "Review": "Start"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};