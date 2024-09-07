import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export interface ShopCardProps {
  id: string;
  image: string | null;
  title: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string | null;
  isFavorite: boolean;
}

const ShopCard: React.FC<ShopCardProps> = ({
  image,
  title,
  reservationStatus,
  rating,
  maxSeats,
  currSeats,
  isFavorite,
}) => {
  const isAvailable = reservationStatus === "can reserve";
  const reservationClass = `absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-green-500" : "bg-red-500"
  }`;
  const seatCountClass = `mt-2 ${isAvailable ? "text-white" : "text-red-500"}`;
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);
  const safeRating = Math.max(0, Math.min(5, Math.floor(rating)));

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setIsFavoriteState((prev) => !prev);
    },
    []
  );

  return (
    <div className="bg-gray-900 rounded overflow-hidden shadow-lg w-auto m-1 flex-shrink-0 relative cursor-pointer">
      <div className="relative">
        <img
          src={image || "/default-image.jpg"}
          alt={title}
          className={`w-full object-cover duration-500 ease-out lg:h-60 md:h-80 sm:h-32`}
        />
        <div
          className={`absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div
          className={`absolute top-2 right-2 text-white text-xl hover:text-red-600 font-bold px-2 py-1 rounded ${
            isFavoriteState ? "text-red-500" : "text-white"
          }`}
        >
          <button onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              className={`${
                isFavoriteState ? "text-yellow-400" : "text-white"
              }`}
              icon={faStar}
            />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 rounded">
          <div className="flex items-center">
            {[...Array(safeRating)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className="text-yellow-400"
              />
            ))}
          </div>
          <p className={`mt-2 ${seatCountClass}`}>
            {currSeats} / {maxSeats}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
