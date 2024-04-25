import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const TeamCarouselCard = ({ member }) => {
  const { nome, cognome, ruolo, foto } = member;

  return (
    <Card className="team-carousel-card">
      <Card.Img variant="top" className="rounded" src={foto || "https://via.placeholder.com/100"} />
      <Card.Body className="text-start">
        <Card.Title>{`${nome} ${cognome}`}</Card.Title>
        <Card.Text>{ruolo || "Posizione non disponibile"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

TeamCarouselCard.propTypes = {
  member: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    cognome: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired,
    foto: PropTypes.string,
  }).isRequired,
};

export default TeamCarouselCard;
