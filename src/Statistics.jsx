import { useState } from "react";
import axios from "axios";

function StatisticsDashboard() {
  const [data, setData] = useState(null); // För Statistics eller Training[]
  const [userMap, setUserMap] = useState({}); // För HashMap<String, Integer>
  const [userId, setUserId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [view, setView] = useState("none"); // 'list', 'stats', 'users'
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:8080"; // Din Gateway

  // GET /{id} -> List<Training>
  const getTrainings = () => {
    axios.get(`${API_BASE}/statistic/${userId}`)
      .then(res => {
        setData(res.data);
        setView("list");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta träningslista"));
  };

  // GET /user/{id} -> Statistics
  const getUserStats = () => {
    axios.get(`${API_BASE}/statistic/user/${userId}`)
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta statistik"));
  };

  // GET /period/user/{id} -> Statistics
  const getPeriodStats = () => {
    if(!startDate || !endDate) return alert("Välj datum!");
    axios.get(`${API_BASE}/statistic/period/user/${userId}`, {
      params: { startDate, endDate }
    })
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta periodstatistik"));
  };

  // GET /users -> HashMap<String, Integer>
  const getAllUsers = () => {
    axios.get(`${API_BASE}/statistic/users`)
      .then(res => {
        setUserMap(res.data);
        setView("users");
        setError("");
      })
      .catch(() => setError("Kunde inte hämta användarstatistik"));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Träningscenter - Statistik</h2>

      {/* Kontroller */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <input type="number" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
        <input type="date" onChange={e => setStartDate(e.target.value)} />
        <input type="date" onChange={e => setEndDate(e.target.value)} />
        
        <button onClick={getTrainings}>Visa Träningspass</button>
        <button onClick={getUserStats}>Total Statistik</button>
        <button onClick={getPeriodStats}>Filtrera Period</button>
        <button onClick={getAllUsers}>Alla Användare</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      {/* Vy 1: List<Training> */}
      {view === "list" && Array.isArray(data) && (
        <div>
          <h3>Träningshistorik (User {userId})</h3>
          {data.map(t => (
            <div key={t.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px", borderRadius: "5px" }}>
              <strong>Datum:</strong> {t.date} <br/>
              <strong>Längd:</strong> {t.duration} minuter
            </div>
          ))}
        </div>
      )}

      {/* Vy 2: Statistics (Objekt) */}
      {view === "stats" && data && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h3>Statistiköversikt</h3>
          <p><strong>Antal pass:</strong> {data.totalTrainings}</p>
          <p><strong>Total tid:</strong> {data.totalDuration} minuter</p>
          <p><strong>Snittlängd:</strong> {data.averageDuration?.toFixed(1)} min/pass</p>
        </div>
      )}

      {/* Vy 3: HashMap<String, Integer> */}
      {view === "users" && (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th>Namn</th>
              <th>Antal Träningar</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userMap).map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{count} st</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StatisticsDashboard;