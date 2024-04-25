import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import HomeCarouselCard from "./HomeCarouselCard";
import { fetchImmobili } from "../../redux/actions/homeAction";

const HomeCarousel = () => {
  const dispatch = useDispatch();
  const immobili = useSelector((state) => state.immobili.items);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTimeout, setDragTimeout] = useState(null);

  useEffect(() => {
    dispatch(fetchImmobili());
  }, [dispatch]);

  const hasEnoughImmobili = immobili.length >= 3;

  const settings = {
    dots: true,
    infinite: hasEnoughImmobili,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: immobili.length >= 3,
          dots: true,
        },
      },
      {
        breakpoint: 976,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: immobili.length >= 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: immobili.length >= 1,
        },
      },
    ],
  };

  const handleMouseDown = () => {
    const timeout = setTimeout(() => setIsDragging(true), 100);
    setDragTimeout(timeout);
  };

  const handleMouseLeaveOrUp = () => {
    clearTimeout(dragTimeout);
    setIsDragging(false);
  };

  return (
    <Container className="text-center my-5">
      <div className="d-flex mb-3">
        <h2>Immobili in vetrina</h2>
      </div>
      <p className="text-start">Le migliori offerte immobiliari selezionate per te</p>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        style={{ cursor: isDragging ? "grabbing" : "default" }}
      >
        <Slider {...settings}>
          {immobili.map((immobile) => (
            <HomeCarouselCard key={immobile.idImmobile} immobile={immobile} />
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default HomeCarousel;
