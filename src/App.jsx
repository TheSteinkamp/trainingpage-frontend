import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import NewSession from './NewSession'
import Trainings from './Trainings'
import Statistics from './Statistics'
import User from './User'
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Öppna sidor */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Skyddade sidor */}
                    <Route path="/newsession" element={
                        <ProtectedRoute><NewSession /></ProtectedRoute>
                    } />
                    <Route path="/trainings" element={
                        <ProtectedRoute><Trainings /></ProtectedRoute>
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute><Home /></ProtectedRoute>
                    } />
                    <Route path="/statistics" element={
                        <ProtectedRoute><Statistics /></ProtectedRoute>
                    } />
                    <Route path="/user" element={
                        <ProtectedRoute><User /></ProtectedRoute>
                    } />

                    {/* Standardväg om man skriver in fel URL */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;