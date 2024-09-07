import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/lib/helpers/environment";

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
  is_favorite: boolean;
  is_popular: boolean;
  type: string | null;
}

export const useFetchStores = () => {
  return useQuery<Store[]>({
    queryFn: () =>
      fetch(`${SERVER_URL}/stores/api/stores`).then((res) => res.json()),
    queryKey: ["stores"],
  });
};