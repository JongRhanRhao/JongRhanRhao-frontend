// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import FavoriteButton from "@/components/shared/FavoriteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export interface ShopCardProps {
  id: string;
  image: string | null;
  title: string;
  storeStatus: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  type: string[];
  open_timebooking: string;
  currSeats: number;
  description: string | null;
  className?: string;
  ImageSliderClass?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id: storeId,
  image,
  title,
  // storeStatus,
  reservationStatus,
  // rating,
  // maxSeats,
  // currSeats,
  storeStatus,
  open_timebooking,
  className,
  ImageSliderClass,
  type,
}) => {
  const isAvailable = storeStatus === "Available";
  const reservationClass = `absolute top-3 text-secondary text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-primary/70" : "bg-rose-500/70"
  }`;
  // const seatCountClass = `mt-2 ${isAvailable ? "text-text" : "text-red-500"}`;
  // const safeRating = Math.max(0, Math.min(5, Math.floor(rating)));
  const { t } = useTranslation();

  return (
    <div
      className={`relative bg-gray-900 rounded shadow-lg cursor-pointer ovrflow-hidden m-a1 wh-auto sflex-shrink-0 card ${className}`}
    >
      <div className="relative">
        {image ? (
          <img
            src={
              image ||
              "https://static.vecteezy.com/system/resources/previews/009/007/134/original/failed-to-load-page-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            }
            alt={title}
            className={`w-full object-cover duration-500 ease-out aspect-auto lg:h-60 md:h-80 sm:h-32`}
          />
        ) : (
          <div className="w-full skeleton h-60"></div>
        )}

        <div
          className={`${ImageSliderClass} absolute top-3 text-xs font-bold px-2 py-1 rounded-r-lg shadow-lg ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div
          className={`${ImageSliderClass} absolute text-lg text-white top-2 right-2`}
        >
          <FavoriteButton storeId={storeId} />
        </div>

        <div
          className={`${ImageSliderClass} absolute px-2 py-1 rounded-r bottom-1`}
        >
          <div
            className={`badge space-x-2 bg-secondary/80 w-fit rounded-xl px-1`}
          >
            <FontAwesomeIcon icon={faClock} className="text-xs text-primary" />
            <div className={`text-text text-xs`}>{open_timebooking}</div>
          </div>
          <br />
          {type && Array.isArray(type) ? (
            type.map((type: string, index: number) => (
              <div
                key={index}
                className={`badge badge-ghost bg-secondary/80 text-xs text-text mr-0.5`}
              >
                {t(type)}
              </div>
            ))
          ) : (
            <span>All</span>
          )}
          {/* <div className="opacity-75">
            <span>{storeStatus}</span>
          </div>
          <p className={`mb-1 ${seatCountClass} shadow-lg animate-pulse`}>
            {currSeats} / {maxSeats}
          </p>
          <div>
            {[...Array(safeRating)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className="text-yellow-400 shadow-lg"
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
