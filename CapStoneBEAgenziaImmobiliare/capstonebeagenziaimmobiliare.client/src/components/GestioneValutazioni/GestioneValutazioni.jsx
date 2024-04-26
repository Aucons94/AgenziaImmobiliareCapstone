import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteValutazione, fetchValutazioni } from "../../redux/actions/gestioneValutazione";
import { Container, Table, Spinner, Alert, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function GestioneValutazioni() {
  const [showModal, setShowModal] = useState(false);
  const [selectedValutazione, setSelectedValutazione] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, valutazioni, error } = useSelector((state) => state.gestioneValutazioni);

  useEffect(() => {
    dispatch(fetchValutazioni());
  }, [dispatch]);

  const handleCancellaClick = (valutazione) => {
    setSelectedValutazione(valutazione);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfermaCancellazione = () => {
    dispatch(deleteValutazione(selectedValutazione.id));
    setShowModal(false);
  };

  const handleDettagliClick = (id) => {
    navigate(`/valutazioni/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Container className="mt-4">
      <h2 className="titoloGestioneValutazioni mb-2">Elenco Richieste Valutazioni</h2>
      <Table className="tableCustomGestioneValutazioni text-center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Cellulare</th>
            <th>Indirizzo</th>
            <th>Attivo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {valutazioni.map((val) => (
            <tr key={val.id}>
              <td>{val.nome}</td>
              <td>{val.cognome}</td>
              <td>{val.cellulare}</td>
              <td>{val.indirizzo}</td>
              <td>{val.attivo ? "Si" : "No"}</td>
              <td>
                <Button className="modificaGestioneValutazioniButton me-4" onClick={() => handleDettagliClick(val.id)}>
                  Dettagli
                </Button>
                <Button className="cancellaGestioneValutazioniButton" onClick={() => handleCancellaClick(val)}>
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
        <Modal.Body>Sei sicuro di voler cancellare questa valutazione ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button className="bottoneCancellaModale" onClick={handleConfermaCancellazione}>
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
