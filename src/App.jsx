import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import NewSession from './pages/NewSession'
import UserStats from './pages/UserStats'
import User from "./pages/User";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LayoutLogin from "./components/LayoutLogin";
import SelectedTraining from "./pages/SelectedTraining";
import Timer from "./components/Timer";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<LayoutLogin />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/newsession" element={<NewSession />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/userstats" element={<UserStats />} />
                            <Route path="/selectedtraining" element={<SelectedTraining />}/>
                            <Route path="/timer" element={<Timer/>} />
                        </Route>
                     </Route>
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
export default App;