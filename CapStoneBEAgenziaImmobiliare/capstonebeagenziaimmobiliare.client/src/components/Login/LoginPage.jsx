import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/actions/loginAction";
import { Form, Button, Container, Alert, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isLoading, user, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      NomeCognome: username,
      Password: password,
    };
    dispatch(fetchLogin(loginObj));
  };

  useEffect(() => {
    if (user && user.nome) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Container className="mt-5">
      <h2 className="titoloLogin">Accedi al tuo profilo</h2>
      <Form onSubmit={handleLogin} className="formLogin">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="text-center my-3">
          <Button variant="primary" type="submit" disabled={isLoading} className="bottoneLogin">
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login"}
          </Button>
        </div>
        {error && (
          <Alert variant="danger" className="mt-3">
            Errore: Username o Password sbagliati.
          </Alert>
        )}
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login effettuato con successo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Benvenuto, {user.nome}!</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LoginPage;
