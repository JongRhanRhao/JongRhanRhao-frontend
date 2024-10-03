import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";
import { Reservation } from "./useFetchReservations";

export const useFetchReservationsByShopIdAndDate = (
  shopId: string,
  reservationDate: string
) => {
  return useQuery<Reservation>({
    queryFn: async () =>
      fetch(
        `${SERVER_URL}/stores/api/reservations/${shopId}/${reservationDate}`
      ).then((res) => res.json()),
    queryKey: [shopId, reservationDate],
  });
};
