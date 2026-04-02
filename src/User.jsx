import { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  
  // State för formuläret (ny användare)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const API_BASE = "http://localhost:8080/user"; // Din Gateway-path till user-service

  // Hämta alla användare vid start
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    axios.get(`${API_BASE}/all`)
      .then(res => setUsers(res.data))
      .catch(() => setError("Kunde inte hämta alla användare"));
  };

  // GET /{id}
  const fetchUserById = () => {
    if (!searchId) return;
    axios.get(`${API_BASE}/${searchId}`)
      .then(res => {
        setSingleUser(res.data);
        setError("");
      })
      .catch(() => {
        setSingleUser(null);
        setError(`Användare med ID ${searchId} hittades inte`);
      });
  };

  // POST /new
  const handleCreateUser = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/new`, formData)
      .then(res => {
        alert(`Användare ${res.data.name} skapad!`);
        setFormData({ name: "", email: "", password: "" }); // Nollställ formulär
        fetchAllUsers(); // Uppdatera listan
      })
      .catch(() => setError("Kunde inte skapa användare"));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Användarhantering</h2>

      {error && <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px" }}>{error}</p>}

      {/* --- SEKTION 1: SKAPA NY ANVÄNDARE --- */}
      <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h3>Registrera ny användare</h3>
        <form onSubmit={handleCreateUser}>
          <div style={{ marginBottom: "10px" }}>
            <input 
              type="text" 
              placeholder="Namn" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required 
              style={{ marginRight: "10px" }}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required 
              style={{ marginRight: "10px" }}
            />
            <input 
              type="password" 
              placeholder="Lösenord" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <button type="submit" style={{ backgroundColor: "#28a745", color: "white", border: "none", padding: "8px 15px", cursor: "pointer" }}>
            Spara Användare
          </button>
        </form>
      </div>

      {/* --- SEKTION 2: SÖK PÅ ID --- */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Sök användare på ID</h3>
        <input 
          type="number" 
          placeholder="Ange ID..." 
          value={searchId} 
          onChange={e => setSearchId(e.target.value)} 
        />
        <button onClick={fetchUserById} style={{ marginLeft: "10px" }}>Sök</button>
        
        {singleUser && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#e9ecef" }}>
            <strong>Hittad:</strong> {singleUser.name} ({singleUser.email}) - ID: {singleUser.id}
          </div>
        )}
      </div>

      {/* --- SEKTION 3: ALLA ANVÄNDARE --- */}
      <div>
        <h3>Alla registrerade användare</h3>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>ID</th>
              <th>Namn</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p>Inga användare hittades i databasen.</p>}
      </div>
    </div>
  );
}

export default User;