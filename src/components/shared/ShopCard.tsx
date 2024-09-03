import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface ShopCardProps {
  id: number;
  image: string;
  title: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  image,
  title,
  reservationStatus,
  rating,
  maxSeats,
  currSeats,
}) => {
  const isAvailable = reservationStatus === "can reserve";
  const reservationClass = isAvailable ? "bg-green-500" : "bg-red-500";
  const isFullseats = isAvailable ? "text-white" : "text-red-500";
  const [isFavorite, setIsFavorite] = useState(false);

  //TODO: Change function to POST to /api/favorite
  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  return (
    <Link to={`/shop/${id}`} className="no-underline">
      <div className="bg-gray-900 rounded overflow-hidden shadow-lg w-auto m-1 flex-shrink-0 relative">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className={
              "w-full max-h-96 object-cover hover:scale-105 duration-500 ease-out"
            }
          />
          <div
            className={`absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${reservationClass}`}
          >
            {reservationStatus}
          </div>
          <div
            className={`absolute top-2 right-2 text-white text-2xl hover:text-red-600 font-bold px-2 py-1 rounded ${
              isFavorite ? "text-red-500" : "text-white"
            }`}
          >
            <button onClick={handleFavoriteClick}>
              <FontAwesomeIcon
                className={`${isFavorite ? "text-red-600" : "text-white"}`}
                icon={faHeart}
              />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs font-bold px-2 py-1 rounded">
            <div className="flex items-center">
              {[...Array(rating)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className="text-yellow-400"
                />
              ))}
            </div>
            <p className={`mt-2 ${isFullseats}`}>
              {currSeats} / {maxSeats}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
