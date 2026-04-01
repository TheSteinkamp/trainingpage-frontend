import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import NewSession from './NewSession'
import Dashboard from './Dashboard'
import Statistics from './Statistics'
import User from './User'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/newsession" element={<NewSession />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;