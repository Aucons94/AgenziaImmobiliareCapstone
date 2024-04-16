import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/actions/loginAction";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, user, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginObj = {
      NomeCognome: username,
      Password: password,
    };
    dispatch(fetchLogin(loginObj));
  };

  if (user && user.nome) {
    return (
      <Container className="mt-5">
        <Alert variant="success">Login effettuato con successo! Benvenuto {user.nome}.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Form onSubmit={handleLogin}>
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
        <Button variant="primary" type="submit" disabled={isLoading} className="mb-3">
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login"}
        </Button>
        {error && (
          <Alert variant="danger" className="mt-3">
            Errore: Username o Password sbagliati.
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default LoginPage;
