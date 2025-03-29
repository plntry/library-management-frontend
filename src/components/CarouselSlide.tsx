import React from "react";

export interface CarouselSlideData {
  title?: string;
  imgSrc: string;
  onClick?: () => void;
}

const CarouselSlide: React.FC<{ slide: CarouselSlideData }> = ({ slide }) => {
  return (
    <div className="relative h-full text-primary-200 text-2xl font-bold">
      <div className="absolute inset-0 w-full px-3 flex justify-center items-center text-center">
        <h2
          onClick={() => slide.onClick && slide.onClick()}
          className={`${
            slide.onClick && "cursor-pointer"
          } rounded-sm bg-black/80 px-3 py-1`}
        >
          {slide.title}
        </h2>
      </div>
      <img src={slide.imgSrc} className="w-full" />
    </div>
  );
};

export default CarouselSlide;
