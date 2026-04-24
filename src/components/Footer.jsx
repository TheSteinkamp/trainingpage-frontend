import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import '../styles/Style.css';
import '../styles/Footer.css';
function Footer() {
    const location = useLocation();


    return (
        <footer className="custom-footer fixed-bottom">
            <Container>
                <div className="footer-content">
                    <span className="footer-text">
                        © 2026 Copyright by <strong>JeaDesign</strong>
                    </span>
                    <a
                        href="https://jessicaspage.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Visit our website
                    </a>
                </div>
            </Container>
        </footer>
    );
}
export default Footer