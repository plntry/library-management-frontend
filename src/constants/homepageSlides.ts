import { CarouselSlideData } from "../components/CarouselSlide";
import book1 from "../assets/books-carousel/book1.jpg";
import book2 from "../assets/books-carousel/book2.jpg";
import book3 from "../assets/books-carousel/book3.jpeg";
import { PATHS } from "../routes/paths";
import i18next from "i18next";

export const getHomepageSlides = (
  navigate: (path: string) => void
): CarouselSlideData[] => [
  {
    title: i18next.t("homepage.slides.findBook"),
    imgSrc: book1,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
  {
    title: i18next.t("homepage.slides.newWorld"),
    imgSrc: book2,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
  {
    title: i18next.t("homepage.slides.readDreamLive"),
    imgSrc: book3,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
];
