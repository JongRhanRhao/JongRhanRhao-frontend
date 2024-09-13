import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";

export interface Store {
  store_id: string;
  owner_id: string | null;
  staff_id: string | null;
  shop_name: string;
  description: string | null;
  rating: number;
  image_url: string | null;
  open_timebooking: string;
  cancel_reserve: string;
  address: string | null;
  status: string;
  max_seats: number;
  curr_seats: number;
  is_popular: boolean;
  type: string[];
}

export const useFetchStores = () => {
  return useQuery<Store[]>({
    queryFn: async () =>
      fetch(`${SERVER_URL}/stores/api/stores`).then((res) => res.json()),
    queryKey: ["stores"],
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });
};
