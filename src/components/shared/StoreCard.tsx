import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface StoreCardProps {
  id: number;
  image: string;
  title: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
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

  return (
    <Link to={`/shop/${id}`} className="no-underline">
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-auto m-1 flex-shrink-0 relative">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className={
              "w-full h-52 object-cover hover:scale-105 duration-500 ease-out"
            }
          />
          <div
            className={`absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${reservationClass}`}
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
      </div>
    </Link>
  );
};

export default StoreCard;
