import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Alert, Modal } from "react-bootstrap";
import { creaUtente, fetchRuoli } from "../../redux/actions/gestioneUtentiAction";
import { useNavigate } from "react-router-dom";

function CreaUtente() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    fkIdRuolo: "",
    password: "",
    confermaPassword: "",
    foto: null,
  });
  const [previewSrc, setPreviewSrc] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ruoli } = useSelector((state) => state.gestioneUtenti);

  useEffect(() => {
    dispatch(fetchRuoli());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, foto: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confermaPassword) {
      setError("Le password non corrispondono");
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    dispatch(creaUtente(data, setError))
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.log(error);
        setError("Errore durante la creazione dell'utente");
      });
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/GestioneUtenti");
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
        <Form.Group controlId="fkIdRuolo">
          <Form.Label>Ruolo</Form.Label>
          <Form.Control as="select" name="fkIdRuolo" value={formData.fkIdRuolo} onChange={handleChange} required>
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
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="confermaPassword">
          <Form.Label>Conferma Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="confermaPassword"
            value={formData.confermaPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="showPassword">
          <Form.Check type="checkbox" label="Mostra Password" checked={showPassword} onChange={handleCheckboxChange} />
        </Form.Group>
        <Form.Group controlId="foto">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          {previewSrc && <img src={previewSrc} alt="Preview" style={{ marginTop: "10px", maxHeight: "200px" }} />}
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button type="submit" variant="primary">
          Crea Utente
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Utente Creato</Modal.Title>
        </Modal.Header>
        <Modal.Body>Utente creato con successo!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CreaUtente;
