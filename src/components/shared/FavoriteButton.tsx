import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { useFavoriteStatus } from "@/hooks/useFavoriteStatus";
import { useUser } from "@/hooks/useUserStore";
import { SERVER_URL } from "@/lib/variables";

const FavoriteButton = ({
  storeId,
  className,
}: {
  storeId: string;
  className?: string;
}) => {
  const { user, isAuthenticated } = useUser();
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
      if (!isAuthenticated) {
        toast.error("Please log in before adding a favorite store.");
        return;
      }
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
    [
      isFavorite,
      handleUnfavoriteClick,
      customerId,
      storeId,
      refetch,
      isAuthenticated,
    ]
  );

  return (
    <div>
      <button onClick={handleFavoriteClick}>
        <FontAwesomeIcon
          className={
            `${isFavorite ? "text-yellow-400" : "text-white"} shadow-lg` +
            className
          }
          icon={faStar}
        />
      </button>
    </div>
  );
};

export default FavoriteButton;
