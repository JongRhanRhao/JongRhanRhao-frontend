import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { SERVER_URL } from "@/lib/variables";

const fetchAvailability = async (
  storeId: string,
  startDate: string,
  endDate: string
) => {
  const { data } = await axios.get(
    `${SERVER_URL}/stores/api/stores/${storeId}/availability`,
    {
      params: { startDate, endDate },
    }
  );
  return data;
};

export const useFetchAvailability = (
  storeId: string,
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ["availability", storeId, startDate, endDate],
    queryFn: () => fetchAvailability(storeId, startDate, endDate),
    enabled: !!storeId && !!startDate && !!endDate,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
