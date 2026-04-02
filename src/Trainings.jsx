import { useEffect, useState } from "react";
import axios from "axios";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = "http://localhost:8080/training";

  useEffect(() => {
    axios.get(`${API_BASE}/all`)
      .then(res => {
        setTrainings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Kunde inte hämta träningar:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mina Träningar</h1>
        <span className="badge bg-primary rounded-pill">Totalt: {trainings.length} pass</span>
      </div>

      {loading && <div className="text-center">Laddar dina träningspass...</div>}

      {!loading && trainings.length === 0 && (
        <div className="alert alert-info">Inga träningspass registrerade ännu.</div>
      )}

      <div className="row">
        {trainings.map(t => (
          <div key={t.id} className="col-12 mb-3">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-primary">{t.type}</h5>
                <small className="text-muted">{t.date}</small>
              </div>
              
              <div className="card-body">
                <p className="card-text">
                  <strong>Varaktighet:</strong> {t.duration} minuter <br />
                  {t.description && <span className="text-secondary small italic">{t.description}</span>}
                </p>

                {t.exercises && t.exercises.length > 0 && (
                  <div className="mt-3">
                    <h6 className="border-bottom pb-1">Övningar</h6>
                    <ul className="list-group list-group-flush">
                      {t.exercises.map((ex, i) => (
                        <li key={i} className="list-group-item px-0 d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-bold">{ex.name}</div>
                            {ex.description && <small className="text-muted d-block">{ex.description}</small>}
                          </div>
                          <span className="badge bg-secondary rounded-pill">
                            {ex.sets} x {ex.repetitions}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trainings;