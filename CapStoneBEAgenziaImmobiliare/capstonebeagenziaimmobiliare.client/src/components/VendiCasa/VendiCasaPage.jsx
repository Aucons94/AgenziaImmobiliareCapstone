import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createValutazione } from "../../redux/actions/VendiCasaAction";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function ValutazioneForm() {
  const [formState, setFormState] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    camereDaLetto: "",
    bagni: "",
    cucina: "",
    sala: "",
    altriVani: "",
    metratura: "",
    box: "",
    postiAuto: "",
    caratteristicheSpeciali: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.valutazione);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createValutazione(formState));
  };

  useEffect(() => {
    if (data) {
      setSubmitted(true);
    }
  }, [data]);

  if (submitted) {
    return (
      <Alert variant="success">
        Richiesta di Valutazione inviata. Appena possibile verrà contattato da un nostro professionista.
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      {loading && <Alert variant="info">Caricamento in corso...</Alert>}
      {error && <Alert variant="danger">Errore: {error}</Alert>}
      <h2 className="mb-4 coloreTitoloVendiCasa">Vendi con noi la tua Casa</h2>
      <Form onSubmit={handleSubmit}>
        <h3 className="coloreTitoloVendiCasa">I Tuoi Dati</h3>
        <Row className="borderVendiCasa pb-5">
          <Col md={6}>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                className="custom-inputVendiCasa"
                value={formState.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="cognome">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                className="custom-inputVendiCasa"
                value={formState.cognome}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                className="custom-inputVendiCasa"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="telefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                className="custom-inputVendiCasa"
                value={formState.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <h3 className="mt-3 coloreTitoloVendiCasa">I Dati della tua Casa</h3>
        <Row>
          <Col md={12}>
            <Form.Group controlId="indirizzo">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control
                type="text"
                name="indirizzo"
                className="custom-inputVendiCasa"
                value={formState.indirizzo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="camereDaLetto">
              <Form.Label>Camere da letto</Form.Label>
              <Form.Control
                type="number"
                name="camereDaLetto"
                className="custom-inputVendiCasa"
                value={formState.camereDaLetto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="bagni">
              <Form.Label>Bagni</Form.Label>
              <Form.Control
                type="number"
                name="bagni"
                className="custom-inputVendiCasa"
                value={formState.bagni}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="cucina">
              <Form.Label>Cucina</Form.Label>
              <Form.Control
                type="text"
                name="cucina"
                className="custom-inputVendiCasa"
                value={formState.cucina}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sala">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                type="text"
                name="sala"
                className="custom-inputVendiCasa"
                value={formState.sala}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="altriVani">
              <Form.Label>Altri Vani</Form.Label>
              <Form.Control
                type="number"
                name="altriVani"
                className="custom-inputVendiCasa"
                value={formState.altriVani}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="metratura">
              <Form.Label>Metratura</Form.Label>
              <Form.Control
                type="number"
                name="metratura"
                className="custom-inputVendiCasa"
                value={formState.metratura}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="box">
              <Form.Label>Box</Form.Label>
              <Form.Control
                type="number"
                name="box"
                className="custom-inputVendiCasa"
                value={formState.box}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="postiAuto">
              <Form.Label>Posti Auto</Form.Label>
              <Form.Control
                type="number"
                name="postiAuto"
                className="custom-inputVendiCasa"
                value={formState.postiAuto}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="caratteristicheSpeciali">
              <Form.Label>Caratteristiche Speciali</Form.Label>
              <Form.Control
                as="textarea"
                name="caratteristicheSpeciali"
                className="custom-inputVendiCasa mb-3"
                value={formState.caratteristicheSpeciali}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Button type="submit" className="mb-5 vendiCasaPageButton">
              Invia Richiesta
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
