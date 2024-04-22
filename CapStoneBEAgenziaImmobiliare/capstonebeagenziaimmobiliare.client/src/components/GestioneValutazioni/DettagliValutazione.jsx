import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchValutazioneDettagli, toggleAttivo } from "../../redux/actions/gestioneValutazione";
import { Container, Spinner, Alert, Button, ListGroup } from "react-bootstrap";

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
  } = valutazioneDettagli;

  return (
    <Container className="mt-4">
      <h2>Dettagli Valutazione</h2>

      <h4>Dati Cliente</h4>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Nome:</strong> {nome}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Cognome:</strong> {cognome}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Cellulare:</strong> {cellulare}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Email:</strong> {email}
        </ListGroup.Item>
      </ListGroup>

      <h4>Dati Immobile</h4>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Indirizzo:</strong> {indirizzo}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Metratura:</strong> {metratura} m²
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Camere da Letto:</strong> {camereDaLetto}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Bagni:</strong> {bagni}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Cucina:</strong> {cucina}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Sala:</strong> {sala}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Altri Vani:</strong> {altriVani}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Box:</strong> {box}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Posti Auto:</strong> {postiAuto}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Caratteristiche Speciali:</strong> {caratteristicheSpeciali}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Attivo:</strong> {valutazioneDettagli.attivo ? "Sì" : "No"}
          <Button onClick={handleToggleActive} variant="secondary" size="sm" className="ms-2">
            Cambia Stato
          </Button>
        </ListGroup.Item>
      </ListGroup>

      <Button variant="primary" onClick={() => navigate(-1)} className="mt-3">
        Torna alla lista
      </Button>
    </Container>
  );
}

export default DettagliValutazione;
