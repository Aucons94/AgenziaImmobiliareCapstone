import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/loginAction";
import { useNavigate } from "react-router-dom";

const selectUserData = (state) => state.login.user;
const selectIsLoggedIn = (state) => !!state.login.user && !!state.login.user.nome;

const NavigationBar = () => {
  const user = useSelector(selectUserData);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setTimeout(() => {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setShowLogoutModal(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="divNav">
      <Container fluid className="customNavbar">
        <Navbar expand="lg">
          <Navbar.Brand href="/">
            <img
              src="./src/assets/logo.png"
              width="200"
              className="d-inline-block align-top"
              alt="Logo Frimm Academy Specialist"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/CercaCasa" className="nav-link-custom">
                Cerca Casa
              </Nav.Link>
              <Nav.Link href="/VendiCasa" className="nav-link-custom">
                Vendi Casa
              </Nav.Link>
              {isLoggedIn && user && (
                <NavDropdown title="Gestione" id="admin-dropdown" className="nav-link-custom">
                  {(user.role === "Master Broker" || user.role === "Coordinatrice") && (
                    <NavDropdown.Item href="/GestioneImmobili" className="navdropdown-item-custom">
                      Gestisci Immobili
                    </NavDropdown.Item>
                  )}
                  {(user.role === "Master Broker" || user.role === "Listing Agent") && (
                    <NavDropdown.Item href="/GestioneValutazioni" className="navdropdown-item-custom">
                      Gestisci Valutazioni
                    </NavDropdown.Item>
                  )}
                  {user.role === "Master Broker" && (
                    <NavDropdown.Item href="/GestioneUtenti" className="navdropdown-item-custom">
                      Gestisci Utenti
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              )}
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout} className="nav-link-custom">
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link href="/Login" className="nav-link-custom">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout effettuato con successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ti stiamo reindirizzando alla Homepage</Modal.Body>
      </Modal>
    </div>
  );
};

export default NavigationBar;
