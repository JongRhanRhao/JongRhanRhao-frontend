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
  const reservationClass = `absolute top-3 text-[#121212] text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-primary" : "bg-rose-500"
  }`;
  const seatCountClass = `mt-2 ${isAvailable ? "text-text" : "text-red-500"}`;
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
    <div className="relative bg-gray-900 rounded shadow-lg cursor-pointer ovrflow-hidden m-a1 wh-auto sflex-shrink-0 card">
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
          <button onClick={handleFavoriteClick}>
            <FontAwesomeIcon
              className={`${
                isFavorite ? "text-yellow-400" : "text-white"
              } shadow-lg`}
              icon={faStar}
            />
          </button>
        </div>
        <div className="absolute px-2 py-1 text-xs font-bold text-white rounded bottom-2 left-2">
          <div className="flex items-center">
            {[...Array(safeRating)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className="text-yellow-400 shadow-lg"
              />
            ))}
          </div>
          <p className={`mt-2 ${seatCountClass} shadow-lg`}>
            {currSeats} / {maxSeats}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
