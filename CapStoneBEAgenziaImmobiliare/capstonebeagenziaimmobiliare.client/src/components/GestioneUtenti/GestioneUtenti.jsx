import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUtente, fetchGestioneUtenti } from "../../redux/actions/gestioneUtentiAction";
import { Spinner, Alert, Table, Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function GestioneUtenti() {
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.gestioneUtenti);

  useEffect(() => {
    dispatch(fetchGestioneUtenti());
  }, [dispatch]);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete == null) {
      console.error("Errore: nessun ID utente da cancellare.");
      setShowModal(false);
      return;
    }
    dispatch(deleteUtente(userIdToDelete));
    setShowModal(false);
    setUserIdToDelete(null);
  };

  const handleEdit = (userId) => {
    navigate(`/ModificaUtente/${userId}`);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.nome}</td>
              <td>{user.cognome}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(user.idUser)}>
                  Modifica
                </Button>
                <Button variant="danger" onClick={() => handleDelete(user.idUser)}>
                  Cancella
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler cancellare questo utente?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
