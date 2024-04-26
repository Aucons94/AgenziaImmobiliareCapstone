import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImmobili, deleteImmobile } from "../../redux/actions/gestioneImmobiliAction";
import { Container, Card, ListGroup, Image, Button, Spinner, Alert, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GestioneImmobili = () => {
  const dispatch = useDispatch();
  const { loading, immobili, error } = useSelector((state) => state.gestioneImmobili);
  const [showModal, setShowModal] = useState(false);
  const [immobileToDelete, setImmobileToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getImmobili());
  }, [dispatch]);

  const handleDettaglioClick = (idImmobile) => {
    navigate(`/Dettaglio/${idImmobile}`);
  };
  const handleModificaClick = (idImmobile) => {
    navigate(`/ModificaImmobile/${idImmobile}`);
  };
  const handleCreateClick = () => {
    navigate(`/CreaImmobile`);
  };

  const handleDeleteClick = (immobile) => {
    setImmobileToDelete(immobile);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteImmobile(immobileToDelete.idImmobile));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setImmobileToDelete(null);
  };

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12} className="text-center my-3">
          <Button className="aggiungiNuovoImmobileButton" onClick={handleCreateClick}>
            Aggiungi Nuovo Immobile
          </Button>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler cancellare questo l&apos;immobile{" "}
          <strong>{immobileToDelete && immobileToDelete.titolo}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Annulla
          </Button>
          <Button className="bottoneCancellaModale" onClick={handleConfirmDelete}>
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>

      {immobili.map((immobile) => (
        <Card key={immobile.idImmobile} className="mb-3">
          <Row>
            <Col md={12} lg={6} xl={5}>
              <Image src={immobile.immagineCopertina || "placeholder-image.jpg"} alt={immobile.titolo} fluid />
            </Col>
            <Col md={12} lg={6} xl={4}>
              <Card.Body className="pb-0">
                <Card.Title as="h4" className="titoloGestioneImmobili">
                  {immobile.titolo}
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Indirizzo:</strong> {immobile.indirizzo}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Prezzo:</strong> €{immobile.prezzo}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Tipo Proprietà:</strong> {immobile.tipoProprieta}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Comune:</strong> {immobile.comune}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Camere:</strong> {immobile.camereDaLetto}
                      </Col>
                      <Col>
                        <strong>Bagni:</strong> {immobile.bagni}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Altri Vani:</strong> {immobile.altriVani}
                      </Col>
                      <Col>
                        <strong>M²</strong> {immobile.metratura}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Col>
            <Col md={12} lg={12} xl={3}>
              <Card.Body>
                <div className="d-flex flex-column">
                  <Button
                    className="dettagliGestioneImmobiliButton"
                    onClick={() => handleDettaglioClick(immobile.idImmobile)}
                  >
                    Dettagli
                  </Button>
                  <Button
                    className="mt-2 modificaGestioneImmobiliButton"
                    onClick={() => handleModificaClick(immobile.idImmobile)}
                  >
                    Modifica
                  </Button>
                  <Button className="mt-2 cancellaGestioneImmobiliButton" onClick={() => handleDeleteClick(immobile)}>
                    Cancella
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default GestioneImmobili;
