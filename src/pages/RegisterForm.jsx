import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import '../styles/Login.css';

function RegisterForm() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const API_BASE = import.meta.env.VITE_API_URL;

    const handleCreateUser = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE}/user/register`, formData)
            .then(res => {
                alert(`User ${res.data.name} created!`);
                setFormData({ name: "", email: "", password: "" });
                navigate('/login')
            })
            .catch(() => setError("Error when creating user"));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card className="login-card shadow-lg">
                <Card.Body className="p-5">
                    <div className="text-center mb-4">
                        <h2>TrainingPage</h2>
                        <p className="text-muted">Register now to start your training jorney!</p>
                    </div>

                    {error && <Alert variant="danger" className="py-2">{error}</Alert>}

                    <Form onSubmit={handleCreateUser}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase">Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </Form.Group>
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
                            Register
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <Link to="/login" className="register-link ms-2">Back to login</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RegisterForm
