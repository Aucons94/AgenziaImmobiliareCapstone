import { Button, Col, Container, Dropdown, DropdownButton, FormControl, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRicercaImmobili } from "../../redux/actions/CercaCasaAction";

const immaginiDiSfondo = [
  "https://re.replat.com/index.php?ac=view_photo_db&site=131359&photo=personal_top",
  "https://www.frimm.com/style/0_0/img/sharer_ps_frimmacademy.jpg",
  "https://media.licdn.com/dms/image/D4E22AQHe1mYmlsUfZw/feedshare-shrink_800/0/1700840010982?e=2147483647&v=beta&t=7YCxj1QQPXqnllnotobWCitowsG6sFKd6v1Y1AFnmwk",
];

function Searchbar() {
  const [activeTab, setActiveTab] = useState("false");
  const [tipoProprieta, setTipoProprieta] = useState("Immobili Residenziali");
  const [ricerca, setRicerca] = useState("");
  const [indiceImmagine, setIndiceImmagine] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    immaginiDiSfondo.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const intervallo = setInterval(() => {
      setIndiceImmagine((prevIndice) => (prevIndice + 1) % immaginiDiSfondo.length);
    }, 3000);

    return () => clearInterval(intervallo);
  }, []);

  const stileSfondo = {
    backgroundImage: `url(${immaginiDiSfondo[indiceImmagine]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 0.5s ease-in-out",
  };

  const handleSearch = () => {
    dispatch(fetchRicercaImmobili(tipoProprieta, ricerca, activeTab));
    navigate("/CercaCasa");
  };

  return (
    <div className="customHomeBackground" style={stileSfondo}>
      <Container>
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="trovaLaTuaCasa text-light">
              <h1 className="titoloSearch">Trova la tua nuova casa</h1>
              <p className="sottotitoloSearch">Scegli tra le migliaia di offerte immobiliari in tutta Italia</p>
            </div>
            <div>
              <div className="d-flex justify-content-start">
                <Button
                  className={`bottoneSearchbarVenAff ${activeTab === "false" ? "active" : ""}`}
                  onClick={() => setActiveTab("false")}
                >
                  Vendita
                </Button>
                <Button
                  className={`bottoneSearchbarVenAff ${activeTab === "true" ? "active" : ""}`}
                  onClick={() => setActiveTab("true")}
                >
                  Affitto
                </Button>
              </div>
              <div className="areaRicerca">
                <Row className="align-items-center">
                  <Col xs={12} md={12} lg={12} xl={3}>
                    <DropdownButton
                      variant="outline-secondary"
                      title={tipoProprieta}
                      id="input-group-dropdown-1"
                      onSelect={(e) => setTipoProprieta(e)}
                      className="custom-dropdown"
                    >
                      <Dropdown.Item eventKey="Immobili Residenziali">Immobili Residenziali</Dropdown.Item>
                      <Dropdown.Item eventKey="Immobili Commerciali">Immobili Commerciali</Dropdown.Item>
                      <Dropdown.Item eventKey="Terreni">Terreni</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                  <Col xs={12} md={12} lg={12} xl={6}>
                    <FormControl
                      type="text"
                      placeholder="Digita un indirizzo o un punto di interesse..."
                      className="w-100 m-0 customFormControl"
                      value={ricerca}
                      onChange={(e) => setRicerca(e.target.value)}
                    />
                  </Col>
                  <Col xs={12} md={12} lg={12} xl={3}>
                    <Button variant="primary" className="w-100 m-0 searchCustomButton" onClick={handleSearch}>
                      Cerca
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Searchbar;
