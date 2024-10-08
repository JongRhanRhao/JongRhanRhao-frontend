import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";
import { Store } from "@/hooks/useFetchStores";

export const useFetchPopularStore = () => {
  return useQuery<Store>({
    queryFn: () =>
      fetch(`${SERVER_URL}/stores/api/stores/popular`).then((res) =>
        res.json()
      ),
    queryKey: ["store_id", "shop_name", "reservation_count"],
    refetchOnWindowFocus: true,
  });
};
