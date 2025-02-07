import { Row, Col, Container, Button, Card } from 'react-bootstrap';
import TrainingMetrics from './TrainingMetrics';
import ResourceCard from '../ui/card';
import GlobeVisualization from './GlobeVisualization';
import GradientText from '../../blocks/TextAnimations/GradientText';
import TrainingModule from './TrainingModule';




const App = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return (
      <div>
        <Training/>
      </div>
    );
  } catch (error) {
    console.error('Error occurred in App component:', error);
    return null;
  }
};

const Training = () => {
  return (
    <div
      style={{
        backgroundColor: '#1a1d23', // Dark background
        height: '100vh',
        padding: '20px',
        overflow: 'hidden',
      }}
    >
      <Container fluid style={{ padding: '20px' }}>
        <Row>
          <Col md={4}>
            <Card
              style={{
                backgroundColor: '#2a2d33', // Card background
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
              }}
            >
              <GradientText
                text="Introduction to Weather APIs"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#ffffff', // Title color
                  marginBottom: '10px',
                }}
              />
              <p
                style={{
                  fontSize: '14px',
                  color: '#cccccc', // Description color
                  marginBottom: '20px',
                }}
              >
                Learn how to use weather APIs to build powerful applications.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: '#4be2fe', // Progress bar color
                    borderRadius: '5px',
                  }}
                >
                  <div
                    style={{
                      width: '50%',
                      height: '10px',
                      backgroundColor: '#34c759', // Progress bar fill color
                      borderRadius: '5px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#ffffff', // Progress percentage color
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      50%
                    </span>
                  </div>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: '#34c759', // Review button color
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.alert('Review button clicked!');
                  }
                }}
              >
                Review
              </Button>
              <Button
                style={{
                  backgroundColor: '#4be2fe', // Start button color
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.alert('Start button clicked!');
                  }
                }}
              >
                Start
              </Button>
            </Card>
          </Col>
          <Col md={8}>
            <Card
              style={{
                backgroundColor: '#2a2d33', // Card background
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
              }}
            >
              <TrainingModule />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card
              style={{
                backgroundColor: '#2a2d33', // Card background
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
              }}
            >
              <ResourceCard children={''} />
            </Card>
          </Col>
          <Col md={8}>
            <Card
              style={{
                backgroundColor: '#2a2d33', // Card background
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
              }}
            >
              <GlobeVisualization />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default App;
