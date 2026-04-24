import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import NewSession from './pages/NewSession'
import Trainings from './pages/Trainings'
import Statistics from './pages/Statistics'
import User from './pages/User'
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Layout from "./components/Layout";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Öppna sidor */}
                    <Route element={<Layout />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Skyddade sidor 
                    <Route element={<ProtectedRoute />}>*/}
                        
                            <Route path="/newsession" element={<NewSession />} />
                            <Route path="/trainings" element={<Trainings />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/user" element={<User />} />
                        </Route>
                    {/* </Route>*/}


                    {/* Standardväg om man skriver in fel URL */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;