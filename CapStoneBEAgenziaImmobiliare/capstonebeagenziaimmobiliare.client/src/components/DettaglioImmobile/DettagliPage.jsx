import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDettaglioImmobile } from "../../redux/actions/dettagliImmobileAction";
import { Container, Card, ListGroup, Button, Spinner, Alert, Row, Col, Carousel } from "react-bootstrap";

const DettagliPage = () => {
  const { idImmobile } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, immobile, error } = useSelector((state) => state.dettagliImmobile);

  useEffect(() => {
    dispatch(getDettaglioImmobile(idImmobile));
  }, [dispatch, idImmobile]);

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

  if (!immobile) {
    return <Alert variant="warning">Immobile non trovato o dati non disponibili.</Alert>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={6}>
          <Carousel>
            {immobile.immagini.map((immagine, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={immagine.immagine}
                  alt={immagine.descrizioneImmagine || "Immagine"}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">{immobile.titolo}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {immobile.descrizione && (
                  <ListGroup.Item>
                    <strong>Descrizione:</strong> {immobile.descrizione}
                  </ListGroup.Item>
                )}
                {immobile.prezzo && (
                  <ListGroup.Item>
                    <strong>Prezzo:</strong> €{immobile.prezzo}
                  </ListGroup.Item>
                )}
                {immobile.tipoProprietà && (
                  <ListGroup.Item>
                    <strong>Tipo Proprietà:</strong> {immobile.tipoProprietà}
                  </ListGroup.Item>
                )}
                {immobile.comune && (
                  <ListGroup.Item>
                    <strong>Comune:</strong> {immobile.comune}
                  </ListGroup.Item>
                )}
                {immobile.indirizzo && (
                  <ListGroup.Item>
                    <strong>Indirizzo:</strong> {immobile.indirizzo}
                  </ListGroup.Item>
                )}
                {immobile.camereDaLetto && (
                  <ListGroup.Item>
                    <strong>Camere da Letto:</strong> {immobile.camereDaLetto}
                  </ListGroup.Item>
                )}
                {immobile.bagni && (
                  <ListGroup.Item>
                    <strong>Bagni:</strong> {immobile.bagni}
                  </ListGroup.Item>
                )}
                {immobile.cucina && (
                  <ListGroup.Item>
                    <strong>Cucina:</strong> {immobile.cucina}
                  </ListGroup.Item>
                )}
                {immobile.sala && (
                  <ListGroup.Item>
                    <strong>Sala:</strong> {immobile.sala}
                  </ListGroup.Item>
                )}
                {immobile.altriVani && (
                  <ListGroup.Item>
                    <strong>Altri Vani:</strong> {immobile.altriVani}
                  </ListGroup.Item>
                )}
                {immobile.metratura && (
                  <ListGroup.Item>
                    <strong>Metratura:</strong> {immobile.metratura} m²
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Torna alla lista
      </Button>
    </Container>
  );
};

export default DettagliPage;
