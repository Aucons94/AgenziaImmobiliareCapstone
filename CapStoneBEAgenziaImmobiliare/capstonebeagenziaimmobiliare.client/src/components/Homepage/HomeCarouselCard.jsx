import { Card, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

const HomeCarouselCard = ({ immobile }) => {
  return (
    <Card className="home-carousel-card">
      <Card.Img
        variant="top"
        src={immobile.immagineCopertina || "https://via.placeholder.com/100"}
        className="card-image"
      />
      <Card.Body>
        <Card.Title>{immobile.titolo || "Titolo non disponibile"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {immobile.comune && immobile.indirizzo
            ? `${immobile.comune}, ${immobile.indirizzo}`
            : "Indirizzo non disponibile"}
        </Card.Subtitle>
        <Badge bg={immobile.tipoProprieta === "Residenziale" ? "success" : "primary"}>
          {immobile.tipoProprieta || "Tipo non disponibile"}
        </Badge>
        <Card.Text>
          <strong>{immobile.prezzo ? `€ ${immobile.prezzo}` : "Prezzo non disponibile"}</strong>
          Camere: {immobile.camereDaLetto || "N/D"} Bagni: {immobile.bagni || "N/D"} m²: {immobile.metratura || "N/D"}
        </Card.Text>
        <Button variant="primary">Dettagli</Button>
      </Card.Body>
    </Card>
  );
};

HomeCarouselCard.propTypes = {
  immobile: PropTypes.shape({
    immagineCopertina: PropTypes.string,
    titolo: PropTypes.string,
    comune: PropTypes.string,
    indirizzo: PropTypes.string,
    tipoProprieta: PropTypes.oneOf(["Residenziale", "Commerciale", "Terreni"]),
    prezzo: PropTypes.number,
    camereDaLetto: PropTypes.number,
    bagni: PropTypes.number,
    metratura: PropTypes.number,
  }).isRequired,
};

export default HomeCarouselCard;
