import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchValutazioneDettagli, toggleAttivo } from "../../redux/actions/gestioneValutazione";
import { Container, Spinner, Alert, Button, Row, Col, Badge } from "react-bootstrap";

export function DettagliValutazione() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valutazioneDettagli, loading, error } = useSelector((state) => state.gestioneValutazioni);

  useEffect(() => {
    dispatch(fetchValutazioneDettagli(id));
  }, [id, dispatch]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!valutazioneDettagli) {
    return (
      <Container>
        <p>Valutazione non trovata o non disponibile.</p>
        <Button onClick={() => navigate(-1)}>Torna indietro</Button>
      </Container>
    );
  }

  const handleToggleActive = () => {
    dispatch(toggleAttivo(valutazioneDettagli.id, valutazioneDettagli.attivo));
  };

  const {
    nome,
    cognome,
    cellulare,
    email,
    metratura,
    indirizzo,
    altriVani,
    bagni,
    box,
    camereDaLetto,
    caratteristicheSpeciali,
    cucina,
    postiAuto,
    sala,
    attivo,
  } = valutazioneDettagli;

  return (
    <Container className="my-4 containerDettagliValutazione">
      <h2 className="titoloDettagliValutazione">Dettagli Valutazione</h2>
      <Badge className={attivo ? "customBadgeDettagliValutazioni" : "customBadgeDisattivatoDettagliValutazioni"}>
        Attivo: {attivo ? "Sì" : "No"}
      </Badge>
      <Button onClick={handleToggleActive} size="sm" className="ms-2 bottoneCambiaStatoDettagliValutazione">
        Cambia Stato
      </Button>
      <h4 className="sottoTitoloDettagliValutazione mt-4 pt-4">Dati Cliente</h4>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Nome:</Badge> {nome}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Cognome:</Badge> {cognome}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Cellulare:</Badge> {cellulare}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Email:</Badge> {email}
        </Col>
      </Row>

      <h4 className="sottoTitoloDettagliValutazione mt-4 pt-4">Dati Immobile</h4>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Indirizzo:</Badge> {indirizzo}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Metratura:</Badge> {metratura} m²
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Camere da Letto:</Badge> {camereDaLetto}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Bagni:</Badge> {bagni}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Cucina:</Badge> {cucina}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Sala:</Badge> {sala}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Altri Vani:</Badge> {altriVani}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Box:</Badge> {box}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Posti Auto:</Badge> {postiAuto}
        </Col>
        <Col>
          <Badge className="customBadgeDettagliValutazioni">Caratteristiche Speciali:</Badge> {caratteristicheSpeciali}
        </Col>
      </Row>
      <div className="my-4 text-center">
        <Button onClick={() => navigate(-1)} className="mt-3 bottoneTornaListaDettagliValutazione">
          Torna alla lista
        </Button>
      </div>
    </Container>
  );
}

export default DettagliValutazione;
