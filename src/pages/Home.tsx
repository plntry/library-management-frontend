import Carousel from "../components/Carousel";
import { homepageSlides } from "../constants/homepageSlides";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 h-full">
      <h1 className="page-title px-3 pt-5">
        Людина з гарною книгою в руках ніколи не може бути самотньою
      </h1>
      <Carousel slides={homepageSlides} />
    </div>
  );
};

export default Home;
