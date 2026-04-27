import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function UserStats() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  // Hämta alla användare vid start
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    axios.get(`${API_BASE}/user/all`)
      .then(res => setUsers(res.data))
      .catch(() => setError("Kunde inte hämta alla användare"));
  };

  // sök användare
  const fetchUserById = () => {
    if (!searchId) return;
    axios.get(`${API_BASE}/user/${searchId}`)
      .then(res => {
        setSingleUser(res.data);
        setError("");
      })
      .catch(() => {
        setSingleUser(null);
        setError(`Användare med ID ${searchId} hittades inte`);
      });
  };

  // ny användare
  const handleCreateUser = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/user/new`, formData)
      .then(res => {
        alert(`Användare ${res.data.name} skapad!`);
        setFormData({ name: "", email: "", password: "" });
        fetchAllUsers();
      })
      .catch(() => setError("Kunde inte skapa användare"));
  };

  function handleLogout() {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Användarhantering</h2>
      <button
        onClick={handleLogout}
        className="btn btn-primary"
      >Logga ut
      </button>
      <p>Inloggad som: {user?.name} (ID: {user?.userId})</p>
      <p>Email: {user?.sub}</p>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Skapa ny användare */}
      <div className="card p-4 mb-4 shadow-sm">
        <h3>Registrera ny användare</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text" placeholder="Namn" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required className="form-control mb-2"
          />
          <input
            type="email" placeholder="Email" value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required className="form-control mb-2"
          />
          <input
            type="password" placeholder="Lösenord" value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required className="form-control mb-2"
          />
          <button type="submit" className="btn btn-success w-100">
            Spara Användare
          </button>
        </form>
      </div>

      {/* Sök användare */}
      <div className="mb-4">
        <h3>Sök användare på ID</h3>
        <div className="input-group">
          <input
            type="number" className="form-control" placeholder="Ange ID..."
            value={searchId} onChange={e => setSearchId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchUserById}>Sök</button>
        </div>

        {singleUser && (
          <div className="mt-3 p-3 bg-light border rounded">
            <strong>Hittad:</strong> {singleUser.name} ({singleUser.email}) - ID: {singleUser.id}
          </div>
        )}
      </div>

      {/* Lista på användare */}
      <div>
        <h3>Alla registrerade användare</h3>
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
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
        {users.length === 0 && <p className="text-muted">Inga användare hittades i databasen.</p>}
      </div>
    </div>
  );
}

export default UserStats;