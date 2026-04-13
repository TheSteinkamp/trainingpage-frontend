import { useState } from "react";
import axios from "axios";

function NewSession() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("")
  const [exercises, setExercises] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL;
  const addExerciseField = () => {
    setExercises([...exercises, { name: "",description: "", repetitions: 0, sets: 0 }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
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
    </div>
  );
}

export default NewSession;