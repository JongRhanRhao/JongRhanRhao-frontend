import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { SERVER_URL } from "@/lib/variables";

const fetchAvailability = async (storeId: string, date: string) => {
  const { data } = await axios.get(
    `${SERVER_URL}/stores/api/stores/${storeId}/availability`,
    {
      params: { date },
    }
  );
  return data;
};

export const useFetchAvailability = (storeId: string, date: string) => {
  return useQuery({
    queryKey: ["availability", storeId, date],
    queryFn: () => fetchAvailability(storeId, date),
    enabled: !!storeId && !!date,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
