import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ShopCard from "@/components/LandingPage/ShopCard";
import { useFetchStores } from "@/hooks/useFetchStores";

interface ShopImageSliderProps {
  currentImageIndex?: number;
}

const ShopImageSlider: React.FC<ShopImageSliderProps> = () => {
  const { t } = useTranslation();
  const { data: stores } = useFetchStores();
  const sliderSettings = {
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
    <Slider {...sliderSettings}>
      {Array.isArray(stores) && stores.length > 0 ? (
        stores.map(
          (store, index) =>
            store && (
              <Link
                to={`/shop/${store.store_id}`}
                className="p-2"
                key={store.store_id || index}
              >
                <ShopCard
                  id={store.store_id}
                  image={store.image_url || ""}
                  title={store.shop_name || "No Title"}
                  storeStatus={store.status || "unknown"}
                  type={store.type || "unknown"}
                  open_timebooking={store.open_timebooking || "unknown"}
                  rating={store.rating || 0}
                  description={store.description || "No description available"}
                  ImageSliderClass="hidden"
                  reservationStatus={""}
                />
              </Link>
            )
        )
      ) : (
        <p>{t("No stores available at the moment.")}</p>
      )}
    </Slider>
  );
};

export default ShopImageSlider;
