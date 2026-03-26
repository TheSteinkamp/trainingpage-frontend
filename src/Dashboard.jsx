// components/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/training/all')
      .then(res => setTrainings(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Mina Träningar</h1>
      {trainings.map(t => (
        <div key={t.id} className="card m-2 p-2">
          <h3>{t.type} - {t.date}</h3>
          <p>{t.duration} minuter</p>
          <ul>
            {t.exercises?.map((ex, i) => (
              <li key={i}>{ex.name}: {ex.sets}x{ex.repetitions}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;