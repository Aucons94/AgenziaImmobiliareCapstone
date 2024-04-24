import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { creaUtente, fetchRuoli } from "../../redux/actions/gestioneUtentiAction";

function CreaUtente() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    ruolo: "",
    password: "",
    confermaPassword: "",
    foto: null,
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { ruoli } = useSelector((state) => state.gestioneUtenti);

  useEffect(() => {
    dispatch(fetchRuoli());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confermaPassword) {
      setError("Le password non corrispondono");
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "confermaPassword") {
        data.append(key, formData[key]);
      }
    });
    dispatch(creaUtente(data, setError));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="cognome">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="text" name="cognome" value={formData.cognome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="ruolo">
          <Form.Label>Ruolo</Form.Label>
          <Form.Control as="select" name="ruolo" value={formData.ruolo} onChange={handleChange} required>
            <option value="">Seleziona un ruolo</option>
            {ruoli.map((role) => (
              <option key={role.idRuolo} value={role.idRuolo}>
                {role.role}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="confermaPassword">
          <Form.Label>Conferma Password</Form.Label>
          <Form.Control
            type="password"
            name="confermaPassword"
            value={formData.confermaPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="foto">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit" variant="primary">
          Crea Utente
        </Button>
      </Form>
    </Container>
  );
}

export default CreaUtente;
