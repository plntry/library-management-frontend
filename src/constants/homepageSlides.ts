import { CarouselSlideData } from "../components/CarouselSlide";
import book1 from "../assets/books-carousel/book1.jpg";
import book2 from "../assets/books-carousel/book2.jpg";
import book3 from "../assets/books-carousel/book3.jpeg";
import { PATHS } from "../routes/paths";

export const getHomepageSlides = (
  navigate: (path: string) => void
): CarouselSlideData[] => [
  {
    title: 'Знайди свою улюблену книгу на сторінці "Усі Книги"',
    imgSrc: book1,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
  {
    title: "Відкрий новий світ з кожною сторінкою",
    imgSrc: book2,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
  {
    title: "Читай - мрій - живи",
    imgSrc: book3,
    onClick: () => navigate(PATHS.BOOKS.link),
  },
];
