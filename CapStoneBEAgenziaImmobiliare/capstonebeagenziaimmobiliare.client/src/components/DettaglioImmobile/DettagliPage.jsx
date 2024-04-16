import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDettaglioImmobile } from "../../redux/actions/dettagliImmobileAction";
import { Container, Card, ListGroup, Image, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

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
    <Container>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Torna alla lista
      </Button>
      <Card>
        <Card.Header as="h5">{immobile.titolo}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Image src={immobile.immagineCopertina || "placeholder-image.jpg"} alt={immobile.titolo} fluid />
            </Col>
            <Col md={8}>
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
                  <strong>Camere da Letto:</strong> {immobile.camereDaLetto}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Bagni:</strong> {immobile.bagni}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Sala:</strong> {immobile.sala}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Altri Vani:</strong> {immobile.altriVani}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Metratura:</strong> {immobile.metratura} m²
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DettagliPage;
