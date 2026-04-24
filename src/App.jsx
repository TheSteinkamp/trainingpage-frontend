import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import NewSession from './pages/NewSession'
import Trainings from './pages/Trainings'
import Statistics from './pages/Statistics'
import UserStats from './pages/UserStats'
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import User from "./pages/User";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LayoutLogin from "./components/LayoutLogin";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Öppna sidor */}
                    <Route element={<LayoutLogin />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Route>
                    {/* Skyddade sidor 
                    <Route element={<ProtectedRoute />}>*/}
                    <Route element={<Layout />}>
                        <Route path="/newsession" element={<NewSession />} />
                        <Route path="/trainings" element={<Trainings />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/userstats" element={<UserStats />} />
                    </Route>
                    {/* </Route>*/}

                    {/* Standardväg om man skriver in fel URL */}
                    <Route path="*" element={<Navigate to="/start" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;