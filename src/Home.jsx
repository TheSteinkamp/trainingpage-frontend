import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [error, setError] = useState("");
  const [trainingList, setTrainingList] = useState(null)
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getTrainings();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  }

  // alla träningar
  const getTrainings = () => {
    axios.get(`${API_BASE}/training/${user?.userId}`)
      .then(res => {
        setTrainingList(res.data);
        setError("");
      })
      .catch(() => setError("Kunde inte hämta träningslista"));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Användarhantering</h2>
      <button
        onClick={handleLogout}
        className="btn btn-primary"
      >Logga ut
      </button>
      <p>Inloggad som: {user?.name}</p>
      <p>Email: {user?.sub}</p>
      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={() => navigate('/newsession')}><span>Skapa ny träning</span></button>

      {/* Vy 1: Lista med träningar */}
      {Array.isArray(trainingList) && (
        <div className="mt-4">
          <h3 className="mb-3">Träningshistorik <small className="text-muted">Användare {user?.userId}</small></h3>
          <div className="row">
            {trainingList.map(t => (
              <div key={t.id} className="col-md-6 mb-3">
                <div className="card border-start border-primary border-4 shadow-sm h-100">
                  <div className="card-body">
                    <p className="card-text mb-1"><strong>Datum:</strong> {t.date}</p>
                    <p className="card-text"><strong>Längd:</strong> {t.duration} minuter</p>
                    <p className="card-text"><strong>Fokus:</strong> {t.type} minuter</p>
                    {/* fixa övningar */}
                    {t.exercise.map((e, index))}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;