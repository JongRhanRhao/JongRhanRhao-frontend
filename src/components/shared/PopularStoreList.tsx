import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StoreCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const PopularStoreList = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-primary">Popular</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary hover:underline cursor-pointer">
            View all
          </span>
        </div>
      </div>
      <Slider {...settings}>
        {ShopCards.map((card) => (
          <div key={card.id} className="px-1">
            <StoreCard
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

export default PopularStoreList;
