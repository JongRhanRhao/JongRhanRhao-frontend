import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (isFavoriteState !== undefined) {
      setIsFavorite(isFavoriteState);
    }
  }, [isFavoriteState, isAuthenticated]);

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
          toast.error(t("Something went wrong. Please try again."));
        } else {
          toast.error(t("Something went wrong. Please try again."));
        }
        setIsFavorite(true);
      }
    },
    [customerId, storeId, refetch, t]
  );

  const handleFavoriteClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!isAuthenticated) {
        toast.error(t("Please log in before adding a favorite store."));
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
          toast.error(t("Something went wrong. Please try again."));
        } else {
          toast.error(t("Something went wrong. Please try again."));
        }
        setIsFavorite(false);
      }
    },
    [
      isAuthenticated,
      isFavorite,
      customerId,
      storeId,
      handleUnfavoriteClick,
      refetch,
      t,
    ]
  );

  return (
    <div className="relative group">
      <button onClick={handleFavoriteClick}>
        <FontAwesomeIcon
          className={`${
            isFavorite ? "text-yellow-400" : "text-white"
          } shadow-lg hover:text-yellow-400 duration-150 ${className}`}
          icon={faStar}
        />
      </button>
      <div
        className="absolute z-10 px-2 py-1 mt-1 text-sm rounded opacity-0 top-full left-1/2 -translate-x-1/2 text-text bg-secondary group-hover:opacity-100 transition-opacity duration-300"
        role="tooltip"
      >
        {isFavorite ? t("Unfavorite") : t("AddToFavorite")}
      </div>
    </div>
  );
};

export default FavoriteButton;
