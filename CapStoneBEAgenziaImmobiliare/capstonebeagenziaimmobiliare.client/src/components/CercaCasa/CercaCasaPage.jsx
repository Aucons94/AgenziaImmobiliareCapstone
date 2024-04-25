import { useState, useCallback } from "react";
import { Button, Col, Container, FormControl, Row, Alert } from "react-bootstrap";
import CercaCasaCard from "./CercaCasaCard";
import { fetchRicercaImmobili } from "../../redux/actions/CercaCasaAction";
import { useDispatch, useSelector } from "react-redux";

const CercaCasaPage = () => {
  const [activeTab, setActiveTab] = useState("vendita");
  const [tipoProprieta, setTipoProprieta] = useState("Immobili Residenziali");
  const [ricerca, setRicerca] = useState("");
  const [erroreRicerca, setErroreRicerca] = useState("");
  const [ricercaEffettuata, setRicercaEffettuata] = useState(false);
  const dispatch = useDispatch();
  const risultatiRicerca = useSelector((state) => state.searchResults.risultatiRicerca);

  const handleSearch = useCallback(() => {
    if (!ricerca.trim()) {
      setErroreRicerca("Per favore, inserisci un indirizzo o una città per la ricerca.");
      return;
    }
    setErroreRicerca("");
    dispatch(fetchRicercaImmobili(tipoProprieta, ricerca, activeTab === "affitto"));
    setRicercaEffettuata(true);
  }, [ricerca, tipoProprieta, activeTab, dispatch]);

  const handleSelect = (event) => {
    setTipoProprieta(event.target.value);
  };

  return (
    <Container className="my-5">
      <h2 className="coloreTitoloCercaCasa mb-5">Cerca la Tua Futura Casa</h2>
      <Row className="justify-content-center mb-2">
        <Col xs={12} md={6} lg={3} className="search-bar mb-4 d-flex">
          <Button
            onClick={() => setActiveTab("vendita")}
            className={`me-2 bottoneCercaCasaVenAff  ${activeTab === "vendita" ? "active" : ""}`}
          >
            Vendita
          </Button>
          <Button
            onClick={() => setActiveTab("affitto")}
            className={`me-2 bottoneCercaCasaVenAff  ${activeTab === "affitto" ? "active" : ""}`}
          >
            Affitto
          </Button>
        </Col>
        <Col xs={12} md={6} lg={3} className="search-bar mb-4 d-flex">
          <FormControl as="select" value={tipoProprieta} onChange={handleSelect} className="me-2 custom-inputCercaCasa">
            <option value="Immobili Residenziali">Immobili Residenziali</option>
            <option value="Immobili Commerciali">Immobili Commerciali</option>
            <option value="Terreni">Terreni</option>
          </FormControl>
        </Col>
        <Col xs={12} md={6} lg={6} className="search-bar mb-4 d-flex">
          <FormControl
            type="text"
            placeholder="Inserisci indirizzo o città"
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
            className="me-2 custom-inputCercaCasa"
          />
          <Button onClick={handleSearch} className="searchCercaCasaButton">
            Cerca
          </Button>
        </Col>

        {erroreRicerca && <Alert variant="danger">{erroreRicerca}</Alert>}
      </Row>
      <Row>
        {ricercaEffettuata && risultatiRicerca.length === 0 ? (
          <Col>
            <div className="text-center">Nessun risultato trovato</div>
          </Col>
        ) : (
          risultatiRicerca.map((immobile, index) => (
            <Col key={index} md={4} className="d-flex align-items-stretch mb-4">
              <CercaCasaCard immobile={immobile} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default CercaCasaPage;
