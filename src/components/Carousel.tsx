import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import CarouselSlide, { CarouselSlideData } from "./CarouselSlide";
import "swiper/css/pagination";

const Carousel: React.FC<{ slides: CarouselSlideData[] }> = ({ slides }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-auto sm:h-100 rounded-md"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
