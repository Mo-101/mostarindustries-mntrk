
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TrainingMetrics } from './TrainingMetrics';
import { ResourceCard } from './ResourcesSection';
import { GlobeVisualization } from './GlobeVisualization';
import GradientText from '@/blocks/TextAnimations/GradientText/GradientText';
import { Card } from "@/components/ui/card";

const Training = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-6">
      <Container fluid>
        <Row className="mb-8">
          <Col md={12}>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4be2fe] to-[#34c759] bg-clip-text text-transparent">
              Training Center
            </h1>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={4}>
            <Card className="bg-[#222632]/80 backdrop-blur-lg border border-[#ffffff1a] p-6 rounded-xl shadow-lg">
              <div className="mb-4">
                <GradientText
                  text="Introduction to Weather APIs"
                  className="text-xl font-semibold mb-2"
                />
                <p className="text-gray-400 text-sm">
                  Learn how to use weather APIs to build powerful applications.
                </p>
              </div>
              
              <div className="mb-4">
                <div className="h-2 bg-[#1a1d23] rounded-full overflow-hidden">
                  <div 
                    className="h-full w-1/2 bg-gradient-to-r from-[#4be2fe] to-[#34c759]"
                    style={{ transition: 'width 0.3s ease' }}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-1">50% Complete</span>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-[#34c759] hover:bg-[#2ab54a] text-white border-0 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => window?.alert('Review button clicked!')}
                >
                  Review
                </Button>
                <Button
                  className="flex-1 bg-[#4be2fe] hover:bg-[#3acfeb] text-white border-0 py-2 px-4 rounded-lg transition-colors"
                  onClick={() => window?.alert('Start button clicked!')}
                >
                  Start
                </Button>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-[#222632]/80 backdrop-blur-lg border border-[#ffffff1a] p-6 rounded-xl shadow-lg h-full">
              <div className="h-full">
                <GlobeVisualization />
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <div className="space-y-4">
              <Card className="bg-[#222632]/80 backdrop-blur-lg border border-[#ffffff1a] p-6 rounded-xl shadow-lg">
                <GradientText
                  text="Training Metrics"
                  className="text-xl font-semibold mb-4"
                />
                <TrainingMetrics title="" metrics={[
                  {
                    label: "Progress",
                    value: "50%",
                    color: "themecyan",
                    trend: {
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                      datasets: [{
                        label: "Progress",
                        data: [20, 35, 45, 48, 50],
                        borderColor: "#4be2fe",
                        backgroundColor: "rgba(75, 226, 254, 0.1)",
                        fill: true,
                      }]
                    }
                  }
                ]} />
              </Card>

              <Card className="bg-[#222632]/80 backdrop-blur-lg border border-[#ffffff1a] p-6 rounded-xl shadow-lg">
                <GradientText
                  text="Resources"
                  className="text-xl font-semibold mb-4"
                />
                <ResourceCard
                  title="API Documentation"
                  description="Complete guide to weather API integration"
                  link="https://example.com/docs"
                />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Training;
