import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ResourcesSection = () => {
  return (
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
  );
};