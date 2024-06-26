import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDettagliUtente, fetchModificaUtente, fetchRuoli } from "../../redux/actions/gestioneUtentiAction";
import { Container, Form, Button, Spinner, Alert, Card, Image, FormControl, Modal, Row, Col } from "react-bootstrap";

function ModificaUtente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, loading, error, ruoli } = useSelector((state) => state.gestioneUtenti);

  const [userForm, setUserForm] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    password: "",
    foto: "",
    fkIdRuolo: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRuoli());
    if (id) {
      dispatch(fetchDettagliUtente(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (userDetail) {
      setUserForm({
        nome: userDetail.nome || "",
        cognome: userDetail.cognome || "",
        telefono: userDetail.telefono || "",
        password: "",
        foto: userDetail.foto || "",
        fkIdRuolo: userDetail.fkIdRuolo ? userDetail.fkIdRuolo.toString() : "",
      });
    }
  }, [userDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserForm((prev) => ({
      ...prev,
      fotoFile: file,
      foto: URL.createObjectURL(file),
    }));
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("Le password non corrispondono.");
      return;
    }
    setShowConfirmationModal(true);
  };

  const handleUpdateConfirmation = () => {
    const formData = new FormData();
    formData.append("nome", userForm.nome);
    formData.append("cognome", userForm.cognome);
    formData.append("telefono", userForm.telefono);
    formData.append("password", newPassword || "");
    formData.append("fkIdRuolo", userForm.fkIdRuolo);
    if (userForm.fotoFile) {
      formData.append("foto", userForm.fotoFile);
    }
    dispatch(fetchModificaUtente(id, formData));
    setShowConfirmationModal(false);
    setSuccess(true);
    navigate("/GestioneUtenti");
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (success) return <Alert variant="success">Utente aggiornato con successo!</Alert>;

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit} className="formModificaUtente">
            <Row>
              <Col md={12} lg={8} xl={6} className="text-center">
                {userForm.foto && (
                  <>
                    <Image src={userForm.foto} rounded className="w-100" />
                    <div className="mt-3 text-center">
                      <Button onClick={handleFileClick} className="customFileModificaUtente">
                        Carica Nuova Immagine
                      </Button>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                  </>
                )}
              </Col>
              <Col md={12} lg={4} xl={6}>
                <Form.Group className="mb-3" controlId="formNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" name="nome" value={userForm.nome} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCognome">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control type="text" name="cognome" value={userForm.cognome} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={userForm.telefono}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRuolo">
                  <Form.Label>Ruolo</Form.Label>
                  <Form.Control
                    as="select"
                    name="fkIdRuolo"
                    value={userForm.fkIdRuolo}
                    onChange={handleChange}
                    required
                  >
                    {ruoli.map((role) => (
                      <option key={role.idRuolo} value={role.idRuolo}>
                        {role.role}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>Nuova Password</Form.Label>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Conferma Nuova Password</Form.Label>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Mostra password"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mt-2"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="my-3 text-center">
              <Button className="bottoneAggiornaUtente" type="submit">
                Aggiorna Utente
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Modifica</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler aggiornare questo utente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleUpdateConfirmation}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ModificaUtente;
