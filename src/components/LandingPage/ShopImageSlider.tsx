import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ShopCard from "@/components/LandingPage/ShopCard";
import { STORE_AVAILABILITY_STATUS } from "@/lib/variables";
import { useFetchStores } from "@/hooks/useFetchStores";

interface ShopImageSliderProps {
  currentImageIndex: number;
}

const ShopImageSlider: React.FC<ShopImageSliderProps> = () => {
  const { t } = useTranslation();
  const { data: stores } = useFetchStores();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      {Array.isArray(stores) &&
        stores.length > 0 &&
        stores.map((store, index) => (
          <Link
            to={`/shop/${store.store_id}`}
            className="p-2"
            key={store.store_id || index}
          >
            <ShopCard
              id={store.store_id}
              image={store.image_url || ""}
              title={store.shop_name}
              storeStatus={store.status}
              reservationStatus={
                store.curr_seats < store.max_seats
                  ? t(STORE_AVAILABILITY_STATUS.AVAILABLE)
                  : t(STORE_AVAILABILITY_STATUS.UNAVAILABLE)
              }
              type={store.type}
              open_timebooking={store.open_timebooking}
              rating={store.rating}
              maxSeats={store.max_seats}
              currSeats={store.curr_seats}
              description={store.description || ""}
              ImageSliderClass="hidden"
            />
          </Link>
        ))}
    </Slider>
  );
};

export default ShopImageSlider;
