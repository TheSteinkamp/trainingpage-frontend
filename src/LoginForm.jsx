import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function LoginForm() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const requestBody = { email, password };
      const response = await axios.post(
        'http://localhost:8080/login',
        requestBody,
        { withCredentials: true },
      );
      const userResponse = await axios.get(
        'http://localhost:8080/user',
        { withCredentials: true },
      );
      login(userResponse.data);

      navigate("/");
    } catch (error) {
      setError(true);
      console.error(
        "Login failed:",
        error.response?.data?.message || "Network Error",
      );
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <form onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Logga in</h2>
          <div className="mb-3">
            {error && (
            <div className="alert alert-danger p-2 my-2">
              något gick fel
            </div>
          )}
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              lösenord
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            logga in
          </button>
          <p className="text-center mt-3">
            inget konto
            <Link to="/register">registrera</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
