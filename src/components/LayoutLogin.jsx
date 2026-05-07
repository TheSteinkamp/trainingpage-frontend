import Navbar from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import '../styles/Login.css';

function LayoutLogin() {
    return (
        <div className="main-wrapper">
            <main className="container content-container-login">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default LayoutLogin;

