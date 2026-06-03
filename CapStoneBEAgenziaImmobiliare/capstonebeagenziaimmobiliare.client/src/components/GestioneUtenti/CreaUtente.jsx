import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Modal, Alert } from "react-bootstrap";
import { creaUtente, fetchRuoli } from "../../redux/actions/gestioneUtentiAction";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useModal } from "../../hooks/useModal";

function CreaUtente() {
  const { values: formData, handleChange, resetForm } = useForm({
    nome: "",
    cognome: "",
    telefono: "",
    fkIdRuolo: "",
    password: "",
    confermaPassword: "",
  });

  const {
    file: foto,
    preview: previewSrc,
    error: fileError,
    handleFileChange,
    clearFile,
  } = useFileUpload({
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  });

  const { isOpen: showSuccessModal, open: openSuccessModal, close: closeSuccessModal } = useModal(false);
  const { isOpen: showErrorModal, open: openErrorModal, close: closeErrorModal } = useModal(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ruoli = useSelector((state) => state.gestioneUtenti.ruoli);

  useEffect(() => {
    dispatch(fetchRuoli());
  }, [dispatch]);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!foto) {
      setError("Inserisci un'immagine.");
      openErrorModal();
      return;
    }
    
    if (formData.password !== formData.confermaPassword) {
      setError("Le password non corrispondono.");
      openErrorModal();
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("foto", foto);
    
    dispatch(creaUtente(data, setError))
      .then(() => {
        openSuccessModal();
      })
      .catch(() => {
        setError("Errore durante la creazione dell'utente.");
        openErrorModal();
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/jpeg,image/png,image/jpg"
            style={{ display: "none" }} 
          />
          {fileError && <Alert variant="danger" className="mt-2">{fileError}</Alert>}
          {previewSrc && <img src={previewSrc} alt="Preview" style={{ marginTop: "10px", maxHeight: "200px" }} />}
        </Form.Group>
        <div className="my-4 text-center">
          <Button type="submit" className="bottoneCreaUtente">
            Crea Utente
          </Button>
        </div>
      </Form>

      <Modal show={showErrorModal} onHide={closeErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeErrorModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

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
