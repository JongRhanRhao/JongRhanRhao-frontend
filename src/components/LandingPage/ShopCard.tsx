import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import FavoriteButton from "@/components/shared/FavoriteButton";

export interface ShopCardProps {
  id: string;
  image: string | null;
  title: string;
  storeStatus: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string | null;
  className?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id: storeId,
  image,
  title,
  // storeStatus,
  reservationStatus,
  rating,
  maxSeats,
  currSeats,
  className,
}) => {
  const isAvailable = currSeats < maxSeats;
  const reservationClass = `absolute top-3 text-secondary text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-primary/65" : "bg-rose-500/65"
  }`;
  const seatCountClass = `mt-2 ${isAvailable ? "text-text" : "text-red-500"}`;
  const safeRating = Math.max(0, Math.min(5, Math.floor(rating)));

  return (
    <div
      className={`relative bg-gray-900 rounded shadow-lg cursor-pointer ovrflow-hidden m-a1 wh-auto sflex-shrink-0 card ${className}`}
    >
      <div className="relative">
        <img
          src={
            image ||
            "https://static.vecteezy.com/system/resources/previews/009/007/134/original/failed-to-load-page-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
          }
          alt={title}
          className={`w-full object-cover duration-500 ease-out aspect-auto lg:h-60 md:h-80 sm:h-32`}
        />
        <div
          className={`absolute top-3 text-xs font-bold px-2 py-1 rounded-r-lg shadow-lg ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div className="absolute text-xl text-white top-2 right-2">
          <FavoriteButton storeId={storeId} />
        </div>
        <div className="absolute px-2 py-0.5 text-xs font-bold text-white rounded-r bottom-1 bg-secondary/80">
          {/* <div className="opacity-75">
            <span>{storeStatus}</span>
          </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
