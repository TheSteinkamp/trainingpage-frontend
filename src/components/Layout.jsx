import Navbar from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import '../styles/Style.css';

function Layout() {
  return (
    <div className="main-wrapper">
      <Navbar />
      <main className="container content-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;

