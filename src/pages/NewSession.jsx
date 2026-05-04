import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../styles/NewSession.css";

function NewSession() {
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("")
  const [sessionExercises, setSessionExercises] = useState([]);
  const [exerciseList, setExerciseList] = useState([])
  const [bodyParts, setBodyParts] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;
  const [error, setError] = useState("");

  useEffect(() => {
    getAllBodyParts();
    getAllDifficultys();
  }, []);

  const addExerciseField = () => {
    setSessionExercises([...sessionExercises, { name: "", description: "", repetitions: 0, sets: 0, id: "" }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...sessionExercises];
    updatedExercises[index][field] = value;
    setSessionExercises(updatedExercises);
  };

  const addSelectedExercise = (exercise) => {
    console.log("Adding exercise:", exercise);
    const newExercise = {
      ...exercise,
      sets: 0,
      repetitions: 0,
      id: exercise.id
    };
    setSessionExercises([...sessionExercises, newExercise]);
  };

  const getAllBodyParts = () => {
    axios.get(`${API_BASE}/exercise/bodypartlist`)
      .then(res => {
        console.log(res.data)
        setBodyParts(res.data);
        setError("");
      })
      .catch(() => setError("Could not fetch list of bodyparts"));
  };

  const getAllDifficultys = () => {
    axios.get(`${API_BASE}/exercise/difficultylist`)
      .then(res => {
        console.log(res.data)
        setDifficulty(res.data);
        setError("");
      })
      .catch(() => setError("Could not fetch list of difficultys"));
  };

  useEffect(() => {
    if (selectedBodyPart && selectedDifficulty) {
      axios.get(`${API_BASE}/exercise/bodypart/${selectedBodyPart}/difficulty/${selectedDifficulty}`)
        .then(res => {
          console.log(res.data)
          setExerciseList(res.data);
          setError("");
        })
        .catch(() => setError("Could not fetch list of selected exercises"));
    }
  }, [selectedBodyPart, selectedDifficulty]);


  // spara träning
  const handleSubmit = async (e) => {
    e.preventDefault();
    const exerciseToSave = sessionExercises.map(ex => ({
      exerciseId: ex.id,
      repetitions: ex.repetitions,
      sets: ex.sets,
      name: ex.name,
      description: ex.description
    }));
    const trainingData = {
      type,
      duration,
      description,
      date: new Date().toISOString().split('T')[0],
      userId: user?.userId,
      sessionExercises: exerciseToSave
    };
    console.log(trainingData);
    try {
      await axios.post(`${API_BASE}/training/new`, trainingData);
      alert("New session saved!");
      handleCleanAll();
    } catch (err) {
      console.error("Couldn't save session:", err);
    }
  };

  const handleCleanAll = () => {
    setSessionExercises([]);
    setType("");
    setDescription("");
    setDuration(0);
    setSelectedBodyPart("");
    setSelectedDifficulty("");
    setExerciseList([]);
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
                placeholder="Do you have anything to add?"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <h4>Exercises</h4>
            {sessionExercises.map((ex, index) => (
              <Card key={index} className="exercise-input-card mb-3">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="mb-2"
                        placeholder="Exercise Name"
                        value={ex.name || ""}
                        onChange={e => handleExerciseChange(index, "name", e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Comments</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="mb-2"
                        placeholder="Do you have anything to add?"
                        value={ex.description || ""}
                        onChange={e => handleExerciseChange(index, "description", e.target.value)}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label>Repetitions</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Reps"
                        value={ex.repetitions || 0}
                        onChange={e => handleExerciseChange(index, "repetitions", e.target.value)}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label>Sets</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Sets"
                        value={ex.sets || 0}
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
      <Card className="form-card shadow-sm mb-5">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Label>Select body part to train</Form.Label>
              <Form.Select
                value={selectedBodyPart}
                onChange={e => setSelectedBodyPart(e.target.value)}>
                <option disabled={true} value="">Select Body Part</option>
                {bodyParts.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Form.Select>

            </Col>
            <Col md={6}>
              <Form.Label>Select difficulty</Form.Label>
              <Form.Select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}>
                <option disabled={true} value="">Select difficulty</option>
                {difficulty.map((d) => (
                  <option key={d} value={d}>
                    {d}</option>))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {exerciseList &&
        <Row>
          {exerciseList.map(e => (
            <Col key={e.id} md={6} lg={4} className="mb-4">
              <Card className="exercise-library-card h-100 shadow-sm">
                <Card.Header className="library-card-header">{e.name}</Card.Header>
                <Card.Body>
                  {/*<div className="info-badge mb-2">{e.bodyPart} • {e.difficulty}</div>*/}
                  <p className="card-detail"><strong>Target:</strong> {e.target}</p>
                  {e.secondaryMuscles && (
                    <div className="card-detail">
                      <strong>Secondary muscles:</strong>
                      <ol>
                        {e.secondaryMuscles.map((ins, i) => <li key={i}>{ins}</li>)}
                      </ol>
                    </div>
                  )}
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
                <Card.Footer className="text-muted small">Category: {e.category}
                  <Button variant="outline-orange"
                    className="me-2" onClick={() => addSelectedExercise(e)}>
                    + Add to session
                  </Button></Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      }
    </Container>
  );
}
export default NewSession;