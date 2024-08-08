import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const StoreCard = ({
  image,
  title,
  reservationStatus,
  rating,
  maxSeats,
  currSeats,
  description,
}: {
  image: string;
  title: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string;
}) => {
  const isAvailable = reservationStatus === "can reserve";
  const reservationClass = isAvailable ? "bg-green-500" : "bg-red-500";
  const isFullseats = isAvailable ? "text-white" : "text-red-500";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-64 m-1 flex-shrink-0 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-52 object-cover" />
        <div
          className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
          <FontAwesomeIcon icon={faHeart} />
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
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex-col flex items-center justify-center p-4 text-center text-white">
          <div className="p-4">
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default StoreCard;