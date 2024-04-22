import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/loginAction";

const selectUserData = (state) => state.login.user;
const selectIsLoggedIn = (state) => !!state.login.user && !!state.login.user.nome;

const NavigationBar = () => {
  const user = useSelector(selectUserData);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
              <Nav.Link href="#contatti" className="nav-link-custom">
                Contatti
              </Nav.Link>
              {isLoggedIn && user && (
                <NavDropdown title="Gestione" id="admin-dropdown" className="nav-link-custom">
                  <NavDropdown.Item href="/GestioneImmobili" className="navdropdown-item-custom">
                    Gestisci Immobili
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/GestioneValutazioni" className="navdropdown-item-custom">
                    Gestisci Valutazioni
                  </NavDropdown.Item>
                  {user.role === "Master Broker" && (
                    <NavDropdown.Item href="#gestisci-utenti" className="navdropdown-item-custom">
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
    </div>
  );
};

export default NavigationBar;
