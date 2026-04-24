import { useState, useEffect } from "react";
import axios from "axios";

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
    axios.get(`${API_BASE}/exercise/all`)
      .then(res => {
        setExerciseList(res.data);
        console.log("data : " + res.data);
        setError("");
      })
      .catch(() => setError("Kunde inte hämta övningslista"));
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
      alert("Träning sparad!");
      handleCleanAll();
    } catch (err) {
      console.error("Kunde inte spara:", err);
    }
  };

  const handleCleanAll = () => {
    setExercises([]);
    setType("");
    setDescription("");
    setDuration(0);
  };

  return (
    <div className="container mt-4">
      <h2>Registrera nytt pass</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Fokus på passet (t.ex. överkropp)" value={type} onChange={e => setType(e.target.value)} className="form-control mb-2" />
        <input type="number" placeholder="Minuter" value={duration} onChange={e => setDuration(e.target.value)} className="form-control mb-2" />
        <input type="text" placeholder="Kommentarer" value={description} onChange={e => setDescription(e.target.value)} className="form-control mb-2" />

        <h4>Övningar</h4>
        {exercises.map((ex, index) => (
          <div key={index} className="border p-2 mb-2">
            <input type="text" placeholder="Namn" onChange={e => handleExerciseChange(index, "name", e.target.value)} className="form-control mb-1" />
            <input type="text" placeholder="Kommentarer" onChange={e => handleExerciseChange(index, "description", e.target.value)} className="form-control mb-1" />
            <input type="number" placeholder="Reps" onChange={e => handleExerciseChange(index, "repetitions", e.target.value)} className="form-control mb-1" />
            <input type="number" placeholder="Sets" onChange={e => handleExerciseChange(index, "sets", e.target.value)} className="form-control mb-1" />
          </div>
        ))}

        <button type="button" onClick={addExerciseField} className="btn btn-secondary mb-2">
          + Lägg till övning
        </button>
        <button type="submit" className="btn btn-primary w-100">Spara hela passet</button>
      </form>

      <div className="mt-4">
        <h3 className="mb-3">Alla övningar</h3>
        <div className="row">
          {exerciseList.map(e => (
            <div key={e.id} className="col-md-6 mb-3">
              <div className="card border-start border-primary border-4 shadow-sm h-100">
                <div className="card-body">
                  <p className="card-text"><strong>Name of exercise:</strong> {e.name}</p>
                  <p className="card-text"><strong>Body part to focus on:</strong> {e.bodyPart}</p>
                  <p className="card-text"><strong>Equipment needed:</strong> {e.equipment}</p>
                  <p className="card-text"><strong>Target muscles:</strong> {e.target}</p>
                  <p className="card-text"><strong>Secondary muscles:</strong>
                    {e.secondaryMuscles?.map((sm, i) => <li key={i}>{sm}</li>)}
                  </p>
                  <p className="card-text"><strong>Description:</strong> {e.description}</p>
                  <p className="card-text"><strong>Instructions:</strong>
                    {e.instructions?.map((ins, i) => <li key={i}>{ins}</li>)}
                  </p>
                  <p className="card-text"><strong>Difficulty:</strong> {e.difficulty}</p>
                  <p className="card-text"><strong>Category:</strong> {e.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewSession;