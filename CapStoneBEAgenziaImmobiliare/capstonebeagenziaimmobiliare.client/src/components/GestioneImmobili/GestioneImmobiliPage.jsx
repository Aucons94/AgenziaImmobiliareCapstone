import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImmobili } from "../../redux/actions/gestioneImmobiliAction";
import { Container, Row, Col, Card, ListGroup, Image, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GestioneImmobili = () => {
  const dispatch = useDispatch();
  const { loading, immobili, error } = useSelector((state) => state.gestioneImmobili);
  const navigate = useNavigate();
  const handleDettaglioClick = (idImmobile) => {
    navigate(`/dettaglio/${idImmobile}`);
  };

  useEffect(() => {
    dispatch(getImmobili());
  }, [dispatch]);

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
      {immobili.map((immobile) => (
        <Card className="mb-3" key={immobile.idImmobile}>
          <Card.Header as="h5">{immobile.titolo}</Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}>
                <Image src={immobile.immagineCopertina || "placeholder-image.jpg"} alt={immobile.titolo} fluid />
              </Col>
              <Col md={7}>
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
                        <strong>Camere da Letto:</strong> {immobile.camereDaLetto}
                      </Col>
                      <Col>
                        <strong>Bagni:</strong> {immobile.bagni}
                      </Col>
                      <Col>
                        <strong>Sala:</strong> {immobile.sala}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Altri Vani:</strong> {immobile.altriVani}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Metratura:</strong> {immobile.metratura} m²
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={2} className="d-flex flex-column ">
                <Button variant="primary" onClick={() => handleDettaglioClick(immobile.idImmobile)}>
                  Dettagli
                </Button>
                <Button variant="success" className="mt-2">
                  Modifica
                </Button>
                <Button variant="danger" className="mt-2">
                  Cancella
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default GestioneImmobili;
