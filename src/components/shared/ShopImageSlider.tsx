import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const ShopImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
  };

  return (
    <div className="p-4">
      <div className="flex justify-between"></div>
      <Slider {...settings}>
        {ShopCards.map((card) => (
          <div key={card.id} className="px-1">
            <ShopCard
              id={card.id}
              image={card.image}
              title={card.title}
              reservationStatus={card.reservationStatus}
              rating={card.rating}
              currSeats={card.currSeats}
              maxSeats={card.maxSeats}
              description={card.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShopImageSlider;
