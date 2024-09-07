import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShopCard from "@/components/LandingPage/ShopCard";
import { useFetchStores } from "@/hooks/useFetchStores";

const ImageSlider: React.FC = () => {
  const { data: stores, isLoading, error } = useFetchStores();
  const settings = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    cssEase: "linear",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-2xl flex justify-center items-center h-full flex-col">
        Something went wrong, please try again later.
      </div>
    );
  }

  return (
    <div className="p-2">
      <Slider {...settings}>
        {stores?.map((store) => (
          <div key={store.store_id}>
            <ShopCard
              id={store.store_id}
              image={store.image_url || ""}
              title={store.shop_name}
              reservationStatus={
                store.curr_seats < store.max_seats
                  ? "can reserve"
                  : "cannot reserve"
              }
              rating={store.rating}
              maxSeats={store.max_seats}
              currSeats={store.curr_seats}
              description={store.description || ""}
              isFavorite={store.is_favorite}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
