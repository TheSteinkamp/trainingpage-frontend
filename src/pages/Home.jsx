import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <div className="home-container">
      <section className="home-section">
        <h1 className="home-title">Welcome to TrainingPage</h1>
        <p className="home-subtitle">
          Elevate Your Fitness Journey. Track workouts, master your routine, and turn your goals into reality.
        </p>
        <div className="button-group">
          <Button as={Link} to="/login" className="btn-primary-custom" size="lg">
            Login
          </Button>
          <Button as={Link} to="/register" className="btn-primary-custom" size="lg">
            Register
          </Button>
        </div>
      </section>

      <Row className="features-row">
        <Col md={4} className="feature-item">
          <div className="feature-icon">📝</div>
          <h3>Log</h3>
          <p>Easily register new training sessions with detailed info about exercises, sets and reps.</p>
        </Col>
        <Col md={4} className="feature-item">
          <div className="feature-icon">🔍</div>
          <h3>Explore</h3>
          <p>Access our library of movements, targeted muscle groups, and instructions.</p>
        </Col>
        <Col md={4} className="feature-item">
          <div className="feature-icon">📈</div>
          <h3>Analyze</h3>
          <p>Track your progress over time through integrated statistics and history.</p>
        </Col>
      </Row>

      {/* Quote Section */}
      <blockquote className="home-quote">
        <p>“Consistency is the key to success. Start logging your progress today.”</p>
      </blockquote>
    </div>
  );
}
export default Home;