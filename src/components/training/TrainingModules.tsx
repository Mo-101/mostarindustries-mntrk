import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import { TrainingMetrics } from './TrainingMetrics'; 
import { ResourceCard } from './ResourcesSection';
import { GlobeVisualization } from './GlobeVisualization'; 
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText.tsx';
import { card } from '../../components/ui/card'; // Corrected import statement
import './Training.css'; // Import CSS file for styling

const Training = () => {
  return (
    <div className="training-container"> {/* Use CSS class for styling */}
      <Container fluid>
        <Row>
          <Col md={2}>
            <Card className="training-card"> {/* Use CSS class for styling */}
              <GradientText
                text="Introduction to Weather APIs"
                className="training-card-title" // Use CSS class for styling
              />
              <p className="training-card-description"> {/* Use CSS class for styling */}
                Learn how to use weather APIs to build powerful applications.
              </p>
              <div className="training-progress-container"> {/* Use CSS class for styling */}
                <div className="training-progress-bar">
                  <div className="training-progress-fill">
                    <span className="training-progress-text">50%</span>
                  </div>
                </div>
              </div>
              <Button
                className="training-button review-button" // Use CSS classes for styling
                onClick={() => {
                  // Replace with actual review action
                  if (typeof window!== 'undefined') {
                    window.alert('Review button clicked!');
                  }
                }}
              >
                Review
              </Button>
              <Button
                className="training-button start-button" // Use CSS classes for styling
                onClick={() => {
                  // Replace with actual start action
                  if (typeof window!== 'undefined') {
                    window.alert('Start button clicked!');
                  }
                }}
              >
                Start
              </Button>
            </Card>
          </Col>
          <Col md={8}>
            <div style={{ height: '80vh', width: '100%' }}>
              <GlobeVisualization />
            </div>
          </Col>
          <Col md={2}>
            <Card className="training-card"> {/* Use CSS class for styling */}
              <GradientText
                text="Metrics"
                className="training-card-title" // Use CSS class for styling
              />
              <TrainingMetrics title="Training Metrics" metrics={[]} />
            </Card>
            <Card className="training-card"> {/* Use CSS class for styling */}
              <GradientText
                text="Resources"
                className="training-card-title" // Use CSS class for styling
              />
              <ResourceCard
                title="Resource Title"
                description="Resource Description"
                link="https://example.com/resource"
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}> {/* Top title area */}
            <h1>Training Title</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}> {/* Bottom footer area */}
            <footer>Training Footer</footer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const ResourceCard = () => {
  // ResourceCard implementation
};

const GlobeVisualization = () => {
  // GlobeVisualization implementation
};

const TrainingMetrics = () => {
  // TrainingMetrics implementation
}

export default Training;