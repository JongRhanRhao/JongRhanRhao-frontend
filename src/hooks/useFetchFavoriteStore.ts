import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";

interface FavoriteStore {
  customer_id: string;
  store_id: string;
}

export const useFetchFavoriteStore = (customerId: string) => {
  return useQuery<FavoriteStore[]>({
    queryFn: () =>
      fetch(`${SERVER_URL}/stores/api/favorites/customer/${customerId}`).then(
        (res) => res.json()
      ),
    queryKey: ["favorites", customerId],
  });
};
