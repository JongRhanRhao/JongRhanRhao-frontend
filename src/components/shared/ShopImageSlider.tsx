import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const ShopImageSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    cssEase: "linear",
  };

  return (
    <div className="p-2">
      <Slider {...settings}>
        {ShopCards.map((card) => (
          <div key={card.id}>
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
