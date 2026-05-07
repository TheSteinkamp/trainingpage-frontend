import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import '../styles/Login.css';

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
        navigate("/user");
      } else {
        setError("Server did not return any token.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      setError(error.response?.data?.message || "Login failed");
    }
  }


  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="login-card shadow-lg">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2>TrainingPage</h2>
            <p className="text-muted">Welcome back! Please login to your account.</p>
          </div>

          {error && <Alert variant="danger" className="py-2">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-uppercase">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold text-uppercase">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn-primary-custom w-100 py-2 mb-3">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>
            <Link to="/register" className="register-link ms-2">Register here</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;