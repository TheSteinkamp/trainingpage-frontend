import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


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
                alert(`Användare ${res.data.name} skapad!`);
                setFormData({ name: "", email: "", password: "" });
                navigate('/login')
            })
            .catch(() => setError("Kunde inte skapa användare"));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Registrera ny användare</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card p-4 mb-4 shadow-sm">
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
        </div>
    )
}

export default RegisterForm