import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Modal } from "react-bootstrap";
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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ruoli = useSelector((state) => state.gestioneUtenti.ruoli);

  useEffect(() => {
    dispatch(fetchRuoli());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const processFile = (file) => {
    setFormData((prev) => ({ ...prev, foto: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foto) {
      setError("Inserisci un'immagine.");
      setShowErrorModal(true);
      return;
    }
    if (formData.password !== formData.confermaPassword) {
      setError("Le password non corrispondono.");
      setShowErrorModal(true);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    dispatch(creaUtente(data))
      .then(() => {
        setShowSuccessModal(true);
      })
      .catch(() => {
        setError("Errore durante la creazione dell'utente.");
        setShowErrorModal(true);
      });
  };

  return (
    <Container className="my-4">
      <h2 className="titoloCreaUtente">Aggiungi un nuovo membro allo Staff</h2>
      <Form onSubmit={handleSubmit} className="formCreaUtente">
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
          <Form.Check
            type="checkbox"
            label="Mostra Password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <Form.Group controlId="foto" className="mt-3">
          <Button onClick={handleFileClick} className="customFileCreaUtente">
            Carica Immagine
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          {previewSrc && <img src={previewSrc} alt="Preview" style={{ marginTop: "10px", maxHeight: "200px" }} />}
        </Form.Group>
        {error && (
          <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
            <Modal.Body>{error}</Modal.Body>
          </Modal>
        )}
        <div className="my-4 text-center">
          <Button type="submit" className="bottoneCreaUtente">
            Crea Utente
          </Button>
        </div>
      </Form>

      <Modal show={showSuccessModal} onHide={() => navigate("/GestioneUtenti")}>
        <Modal.Header closeButton>
          <Modal.Title>Utente Creato</Modal.Title>
        </Modal.Header>
        <Modal.Body>Utente creato con successo!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate("/GestioneUtenti")}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CreaUtente;
