import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import NewSession from './NewSession'
import Dashboard from './Dashboard'
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/newsession" element={<NewSession />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;