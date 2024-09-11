import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";

const fetchFavoriteStatus = async (customerId: string, storeId: string) => {
  const { data } = await axios.post(
    `${SERVER_URL}/stores/api/favorites/status`,
    { customerId, storeId }
  );
  return data.isFavorite;
};

export const useFavoriteStatus = (customerId: string, storeId: string) => {
  return useQuery({
    queryKey: ["favorites", customerId, storeId],
    queryFn: () => fetchFavoriteStatus(customerId, storeId),
  });
};
