import { useState } from "react"
import axios from "axios"
import { useNavigate, Link, useSearchParams } from "react-router-dom"


function RegisterForm() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegistration(e) {
        e.preventDefault()
        try {
            const requestBody = {name, email, password}
            const response = await axios.post('http://localhost:8080/user/new', requestBody)
            console.log("Registration successful!", response.data);
            navigate('/login')
        } catch (error) {
            console.log(error);
            if (error.response) {
                alert(`Registration failed: error`);
            } else {
                alert("unable to connect to the server");
            }
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <form onSubmit={handleRegistration}>
                    <h2 className="text-center mb-4">
                        Ny användare
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Namn</label>
                        <input onChange={e => { setName(e.target.value) }} type="name" className="form-control" id="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Lösenord</label>
                        <input onChange={e => { setPassword(e.target.value) }} type="password" className="form-control" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registrera</button>
                    <p className="text-center mt-3">
                        Registrerad <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm