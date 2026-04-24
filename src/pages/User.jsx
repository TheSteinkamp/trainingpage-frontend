import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import "../styles/User.css";

function User() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [error, setError] = useState("");
  const [trainingList, setTrainingList] = useState(null)
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getTrainings();
  }, []);

  // alla träningar
  const getTrainings = () => {
    axios.get(`${API_BASE}/training/user/${user?.userId}`)
      .then(res => {
        setTrainingList(res.data);
        setError("");
      })
      .catch(() => setError("Could not fetch training history."));
  };

  return (
    <Container className="home-container py-4">
      {/* Profilsektion */}
      <Card className="profile-card shadow-sm mb-5">
        <Card.Body className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h2>Welcome, {user?.name}!</h2>
            <p className="text-muted mb-0">Logged in as: {user?.sub}</p>
          </div>
          <div className="button-group-profile mt-3 mt-md-0">
            <Button
              variant="outline-orange"
              className="me-2"
              onClick={() => navigate('/newsession')}
            >
              + New Session
            </Button>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Träningshistorik */}
      <div className="history-section">
        <h3>Training History</h3>

        {Array.isArray(trainingList) && trainingList.length > 0 ? (
          <Row>
            {trainingList.map(t => (
              <Col key={t.id} lg={6} className="mb-4">
                <Card className="training-card h-100 shadow-sm border-0">
                  <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom-0 pt-3">
                    <span className="training-date">{t.date}</span>
                    <h4><Badge className="bg-orange">{t.type}</Badge></h4>        
                  </Card.Header>
                  <Card.Body>
                    <div className="training-meta mb-3">
                      <span className="me-3">⏱ <strong>{t.duration}</strong> min</span>
                    </div>

                    <h6 className="text-muted small text-uppercase fw-bold">Exercises:</h6>
                    <ul className="exercise-mini-list">
                      {t.exercise && t.exercise.map((e, index) => (
                        <li key={index}>
                          <strong>{e.name}</strong> - {e.sets} sets x {e.repetitions} reps
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 empty-history">
            <p className="text-muted">No training sessions found yet.</p>
            <Link to="/newsession" className="btn btn-primary-custom">
              Start your first session
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

export default User;