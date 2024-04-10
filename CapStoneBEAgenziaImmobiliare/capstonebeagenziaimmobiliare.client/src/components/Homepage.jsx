import HomeCarousel from "./Homepage/HomeCarousel";
import Searchbar from "./Homepage/Searchbar";
import TeamCarousel from "./Homepage/TeamCarousel";

const Homepage = () => {
  return (
    <>
      <Searchbar />
      <HomeCarousel />
      <TeamCarousel />
    </>
  );
};

export default Homepage;
