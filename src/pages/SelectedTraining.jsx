import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Container, Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import "../styles/SelectedTraining.css";

function SelectedTraining() {
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [error, setError] = useState("");
  const location = useLocation();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [sessionData, setSessionData] = useState(null);
  const training = location.state?.training;

  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    if (training) {
      console.log(training)
      setSessionData(training);
      fetchExerciseList(training);
    } else {
      setError("No training data found");
    }
  }, [training]);

  const fetchExerciseList = async (sessionData) => {
    const exercisesToFetch = sessionData.exercises;

    const exerciseIds = exercisesToFetch.map(se => se.exerciseId).filter(id => id !== null && id !== undefined && id !== "");
    if (exerciseIds.length === 0) return;

    try {
      const res = await axios.post(`${API_BASE}/exercise/session`, { ids: exerciseIds });
      setExerciseList(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch exercise details");
    }
  };

  const exerciseMap = exerciseList.reduce((acc, ex) => {
    acc[ex.id] = ex;
    return acc;
  }, {});

  if (!sessionData) return <Container><Alert variant="danger">No data found</Alert></Container>;


  return (
    <Container className="training-container py-4">
      <Card className="form-card shadow-sm mb-5">
        <Card.Body className="d-flex justify-content-center align-items-center flex-wrap text-center">
          <div>
            <span className="training-date"><strong>{sessionData.date} - ⏱ {sessionData.duration} min</strong></span>
            <h4><Badge className="bg-orange">Focus: {sessionData.type}</Badge></h4>
            <p><strong>Session comments: </strong>{sessionData.description}</p>
          </div>
        </Card.Body>
      </Card>

      {(sessionData.exercises || sessionData.sessionExercises).map((sessionEx, index) => {
        const details = sessionEx.exerciseId ? exerciseMap[sessionEx.exerciseId] : null;

        return (
          <Card key={index} className="mb-3 border-light shadow-sm overflow-hidden">
            <Card.Body className="p-0">
              <Row className="g-0">

                {/* VÄNSTER SIDA */}
                <Col md={4} className="exercise-left">
                  <h5 className="fw-bold">{sessionEx.name}</h5>
                  <Badge className="bg-orange mb-2">
                    {sessionEx.sets} sets x {sessionEx.repetitions} reps
                  </Badge>
                  {details && (
                    <>
                      <p className="mb-1 small"><strong>Target:</strong> {details.target}</p>
                      <div className="info-badge">{details.bodyPart} • {details.difficulty}</div>
                    </>
                  )}
                  {!details && <Badge bg="secondary" className="mt-2">Custom</Badge>}
                </Col>

                {/* HÖGER SIDA */}
                <Col md={8} className="p-4">
                  <div className="small">
                    <p className="mb-1"><strong>About the exercise:</strong></p>
                    <p className={details ? "card-description" : "text-muted italic"}>
                      {sessionEx.description || "No description provided."}
                    </p>
                    {details?.instructions && (
                      <details className="instructions-box mt-3">
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                          View Instructions
                        </summary>
                        <ol className="mt-2">
                          {details.instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                        </ol>
                      </details>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
}

export default SelectedTraining;