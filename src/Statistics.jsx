import { useState } from "react";
import axios from "axios";

function Statistics() {
  const [data, setData] = useState(null); 
  const [userMap, setUserMap] = useState({}); 
  const [userId, setUserId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [view, setView] = useState("none"); 
  const [error, setError] = useState("");
  const API_BASE = "http://localhost:8080/statistic";

  // alla träningar
  const getTrainings = () => {
    axios.get(`${API_BASE}/${userId}`)
      .then(res => {
        setData(res.data);
        setView("list");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta träningslista"));
  };

  // statistik per användare
  const getUserStats = () => {
    axios.get(`${API_BASE}/user/${userId}`)
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta statistik"));
  };

  // statistik för period
  const getPeriodStats = () => {
    if(!startDate || !endDate) return alert("Välj datum!");
    axios.get(`${API_BASE}/period/user/${userId}`, {
      params: { startDate, endDate }
    })
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta periodstatistik"));
  };

  // hitta alla användarstatistik
  const getAllUsers = () => {
    axios.get(`${API_BASE}/users`)
      .then(res => {
        setUserMap(res.data);
        setView("users");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta användarstatistik"));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Träningsstatistik</h2>

      {/* Kontrollpanel */}
      <div className="card p-4 mb-4 shadow-sm bg-light">
        <div className="row g-3">
          <div className="col-md-2">
            <label className="form-label font-weight-bold">Användar-ID</label>
            <input 
              type="number" 
              className="form-control" 
              value={userId} 
              onChange={e => setUserId(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label font-weight-bold">Från datum</label>
            <input 
              type="date" 
              className="form-control" 
              onChange={e => setStartDate(e.target.value)} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label font-weight-bold">Till datum</label>
            <input 
              type="date" 
              className="form-control" 
              onChange={e => setEndDate(e.target.value)} 
            />
          </div>
          <div className="col-md-4 d-flex align-items-end gap-2">
            <button className="btn btn-outline-primary flex-grow-1" onClick={getTrainings}>Alla pass</button>
            <button className="btn btn-outline-success flex-grow-1" onClick={getUserStats}>Statistik</button>
            <button className="btn btn-outline-info flex-grow-1" onClick={getPeriodStats}>Statistik per period</button>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-warning w-100" onClick={getAllUsers}>
            Visa statistik för alla användare
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Vy 1: Lista med träningar */}
      {view === "list" && Array.isArray(data) && (
        <div className="mt-4">
          <h3 className="mb-3">Träningshistorik <small className="text-muted">Användare {userId}</small></h3>
          <div className="row">
            {data.map(t => (
              <div key={t.id} className="col-md-6 mb-3">
                <div className="card border-start border-primary border-4 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Pass #{t.id}</h5>
                    <p className="card-text mb-1"><strong>Datum:</strong> {t.date}</p>
                    <p className="card-text"><strong>Längd:</strong> {t.duration} minuter</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vy 2: Statistiköversikt */}
      {view === "stats" && data && (
        <div className="card shadow-sm border-0 bg-dark text-white p-4 text-center mt-4">
          <h3 className="mb-4">Statistiköversikt</h3>
          <div className="row">
            <div className="col-4 border-end">
              <div className="display-6">{data.totalTrainings}</div>
              <div className="text-uppercase small">Pass</div>
            </div>
            <div className="col-4 border-end">
              <div className="display-6">{data.totalDuration}</div>
              <div className="text-uppercase small">Minuter</div>
            </div>
            <div className="col-4">
              <div className="display-6">{data.averageDuration?.toFixed(1)}</div>
              <div className="text-uppercase small">Snitt (min)</div>
            </div>
          </div>
        </div>
      )}

      {/* Vy 3: Topplista (HashMap) */}
      {view === "users" && (
        <div className="mt-4">
          <h3 className="mb-3 text-center">Topplista</h3>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-warning">
                <tr>
                  <th className="ps-4">Namn</th>
                  <th className="text-center">Antal Träningar</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userMap).map(([name, count]) => (
                  <tr key={name}>
                    <td className="ps-4 fw-bold">{name}</td>
                    <td className="text-center">
                      <span className="badge bg-primary rounded-pill px-3">{count} st</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;