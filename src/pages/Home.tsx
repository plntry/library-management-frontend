import { useNavigate } from "react-router";
import Carousel from "../components/Carousel";
import { getHomepageSlides } from "../constants/homepageSlides";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 h-full">
      <h1 className="page-title px-3 pt-5">{t("homepage.title")}</h1>
      <Carousel slides={getHomepageSlides(navigate)} />
    </div>
  );
};

export default Home;
