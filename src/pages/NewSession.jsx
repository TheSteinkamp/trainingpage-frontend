import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import "../styles/NewSession.css";

function NewSession() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("")
  const [exercises, setExercises] = useState([]);
  const [exerciseList, setExerciseList] = useState([])
  const API_BASE = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");

  useEffect(() => {
    getAllExercises();
  }, []);

  const addExerciseField = () => {
    setExercises([...exercises, { name: "", description: "", repetitions: 0, sets: 0 }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const getAllExercises = () => {
    const url = `${API_BASE}/exercise/all`;
  console.log("Anropar URL:", url);
    axios.get(`${API_BASE}/exercise/all`)
      .then(res => {
        console.log(res.data)
        setExerciseList(res.data);
        console.log("data : " + res.data);
        setError("");
      })
      .catch(() => setError("Could not fetch exercises"));
  };

  // spara träning
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainingData = {
      type,
      duration,
      description,
      date: new Date().toISOString().split('T')[0],
      userId: 1,
      exercises: exercises
    };
    try {
      await axios.post(`${API_BASE}/training/new`, trainingData);
      alert("New session saved!");
      handleCleanAll();
    } catch (err) {
      console.error("Couldn't save session:", err);
    }
  };

  const handleCleanAll = () => {
    setExercises([]);
    setType("");
    setDescription("");
    setDuration(0);
  };

  return (
    <Container className="session-container py-4">
      <h2>Register New Session</h2>
      <p className="session-subtitle">Fill in the details of your workout and add your exercises below.</p>

      <Card className="form-card shadow-sm mb-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Session Focus</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Upper Body, Leg Day"
                    value={type}
                    onChange={e => setType(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (min)</Form.Label>
                  <Form.Control
                    type="number"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="How did it feel?"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <h4 className="section-divider">Exercises</h4>
            {exercises.map((ex, index) => (
              <Card key={index} className="exercise-input-card mb-3">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        className="mb-2"
                        placeholder="Exercise Name"
                        onChange={e => handleExerciseChange(index, "name", e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        className="mb-2"
                        placeholder="Comments"
                        onChange={e => handleExerciseChange(index, "description", e.target.value)}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        placeholder="Reps"
                        onChange={e => handleExerciseChange(index, "repetitions", e.target.value)}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        placeholder="Sets"
                        onChange={e => handleExerciseChange(index, "sets", e.target.value)}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}

            <div className="d-flex gap-3 mt-3">
              <Button variant="outline-orange"
                className="me-2" onClick={addExerciseField}>
                + Add Exercise
              </Button>
              <Button type="submit" className="btn-primary-custom flex-grow-1">
                Save Entire Workout
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h3>Exercise Library</h3>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {exerciseList.map(e => (
          <Col key={e.id} md={6} lg={4} className="mb-4">
            <Card className="exercise-library-card h-100 shadow-sm">
              <Card.Header className="library-card-header">{e.name}</Card.Header>
              <Card.Body>
                <div className="info-badge mb-2">{e.bodyPart} • {e.difficulty}</div>
                <p className="card-detail"><strong>Target:</strong> {e.target}</p>
                <p className="card-detail"><strong>Equipment:</strong> {e.equipment}</p>
                <p className="card-description">{e.description}</p>
                {e.instructions && (
                  <div className="instructions-box">
                    <strong>Instructions:</strong>
                    <ol>
                      {e.instructions.map((ins, i) => <li key={i}>{ins}</li>)}
                    </ol>
                  </div>
                )}
              </Card.Body>
              <Card.Footer className="text-muted small">Category: {e.category}</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default NewSession;