import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="footer-bg">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="pb-3">Frimm Academy Specialist</h5>
              <p>Via Ferdinando Di Savoia, 3, 00196 Roma, Italia</p>
              <p>
                La nostra agenzia immobiliare è affiliata a Frimm, Gruppo Immobiliare con 20 anni di know-how
                specializzato nell’acquisto e nella vendita di casa. Siamo gli unici in Italia a mettere a disposizione
                migliaia di offerte e richieste d’acquisto, a lavorare senza limiti di zona e a chiedere un’unica
                commissione anche quando lavoriamo in collaborazione con altri colleghi. Con Frimm compri e vendi casa.
                Prima di tutti, meglio di tutti.
              </p>
            </Col>
            <Col md={4}>
              <h5 className="pb-3">Menù</h5>
              <ul>
                <li>Cerca casa</li>
                <li>Vendi casa</li>
                <li>Valuta casa</li>
                <li>Contatti</li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="pb-3">Contatti</h5>
              <p>06.32.10.207</p>
              <p>392.95.46.161</p>
              <p>frimm41252@frimm.com</p>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="underFooter">
        <Container>
          <Row>
            <Col>
              <div className="underFooter-text">
                <p>©2024 Capstone Project | Alessandro Aucone</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
