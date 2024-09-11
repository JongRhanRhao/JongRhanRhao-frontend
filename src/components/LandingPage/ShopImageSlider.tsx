import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShopCard from "@/components/LandingPage/ShopCard";
import { useFetchStores } from "@/hooks/useFetchStores";
import { Link } from "react-router-dom";

const ImageSlider: React.FC = () => {
  const { data: stores } = useFetchStores();
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
    <Slider {...settings}>
      {stores?.map((store) => (
        <Link
          to={`/shop/${store.store_id}`}
          className="p-2"
          key={store.store_id}
        >
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
        </Link>
      ))}
    </Slider>
  );
};

export default ImageSlider;
