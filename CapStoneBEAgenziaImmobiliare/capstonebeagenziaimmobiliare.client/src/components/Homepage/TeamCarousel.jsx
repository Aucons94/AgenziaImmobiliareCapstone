import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import TeamCarouselCard from "./TeamCarouselCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../redux/actions/homeAction";

const TeamCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTimeout, setDragTimeout] = useState(null);
  const dispatch = useDispatch();
  const staffData = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const numToShow = staffData.items.length >= 3;
  const settings = {
    dots: true,
    infinite: numToShow,
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
          infinite: staffData.items.length >= 3,
          dots: true,
        },
      },
      {
        breakpoint: 976,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: staffData.items.length >= 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: staffData.items.length >= 1,
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>La Nostra Squadra</h2>
      </div>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        style={{ cursor: isDragging ? "grabbing" : "default" }}
      >
        <Slider {...settings}>
          {staffData.items && staffData.items.map((member, index) => <TeamCarouselCard key={index} member={member} />)}
        </Slider>
      </div>
    </Container>
  );
};

export default TeamCarousel;
