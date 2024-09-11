import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { SERVER_URL } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import { useFavoriteStatus } from "@/hooks/useFavoriteStatus";

export interface ShopCardProps {
  id: string;
  image: string | null;
  title: string;
  reservationStatus: string;
  rating: number;
  maxSeats: number;
  currSeats: number;
  description: string | null;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id: storeId,
  image,
  title,
  reservationStatus,
  rating,
  maxSeats,
  currSeats,
}) => {
  const isAvailable = reservationStatus === "can reserve";
  const reservationClass = `absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-green-500" : "bg-rose-500"
  }`;
  const seatCountClass = `mt-2 ${isAvailable ? "text-white" : "text-red-500"}`;
  const safeRating = Math.max(0, Math.min(5, Math.floor(rating)));

  const { user } = useUser();
  const customerId = user?.userId?.toString() || "";

  const { data: isFavoriteState, refetch } = useFavoriteStatus(
    customerId,
    storeId
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(
    isFavoriteState || false
  );

  useEffect(() => {
    if (isFavoriteState !== undefined) {
      setIsFavorite(isFavoriteState);
    }
  }, [isFavoriteState]);

  const handleUnfavoriteClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        await axios.post(`${SERVER_URL}/stores/api/favorites/remove`, {
          customerId,
          storeId,
        });
        setIsFavorite(false);
        refetch();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response);
        } else {
          console.error("Error removing favorite:", err);
        }
        setIsFavorite(true);
      }
    },
    [customerId, storeId, refetch]
  );

  const handleFavoriteClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        if (isFavorite) {
          handleUnfavoriteClick(e);
        } else {
          await axios.post(`${SERVER_URL}/stores/api/favorites`, {
            customerId,
            storeId,
          });
          setIsFavorite(true);
          refetch();
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response);
        } else {
          console.error("Error adding favorite:", err);
        }
        setIsFavorite(false);
      }
    },
    [isFavorite, handleUnfavoriteClick, customerId, storeId, refetch]
  );

  return (
    <div className="card bg-gray-900 rounded overflow-hidden shadow-lg w-auto m-1 flex-shrink-0 relative cursor-pointer">
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
          className={`absolute top-3 text-white text-xs font-bold px-2 py-1 rounded-r-lg ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div className="absolute top-2 right-2 text-white text-xl">
          <button onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              className={`${isFavorite ? "text-yellow-400" : "text-white"}`}
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
