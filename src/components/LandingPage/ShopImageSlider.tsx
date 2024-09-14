import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

import ShopCard from "@/components/LandingPage/ShopCard";
import { useFetchStores } from "@/hooks/useFetchStores";
import { Link } from "react-router-dom";
import { STORE_AVAILABILITY_STATUS } from "@/lib/variables";

const ImageSlider: React.FC = () => {
  const { data: stores } = useFetchStores();
  const { t } = useTranslation();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
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
                ? t(STORE_AVAILABILITY_STATUS.AVAILABLE)
                : t(STORE_AVAILABILITY_STATUS.UNAVAILABLE)
            }
            rating={store.rating}
            maxSeats={store.max_seats}
            currSeats={store.curr_seats}
            description={store.description || ""}
          />
        </Link>
      ))}
    </Slider>
  );
};

export default ImageSlider;
