import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const API_BASE = import.meta.env.VITE_API_URL;
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API_BASE}/user/login`, formData);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        login(token);
        navigate("/home");
      } else {
        setError("Servern returnerade ingen token.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      setError(error.response?.data?.message || "Inloggning misslyckades");
    }
  }


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Logga in</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4 mb-4 shadow-sm">
        <form onSubmit={handleLogin}>
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
            Logga in
          </button>
        </form>
        <p className="text-center mt-3">
          Inget konto?
          <Link to="/register"> Registrera</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
