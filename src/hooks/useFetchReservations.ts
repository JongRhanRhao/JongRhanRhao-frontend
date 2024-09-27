import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";

interface Reservation {
  shop_name: string;
  reservation_id: string;
  shop_id: string;
  customerId: string;
  number_of_people: string;
  reservation_date: string;
  reservation_time: string;
  reservation_status: string;
  note: string;
}
export const useFetchReservations = ({
  type,
  id,
}: {
  type: string;
  id: string;
}) => {
  return useQuery<Reservation>({
    queryFn: async () =>
      fetch(`${SERVER_URL}/stores/api/reservations/${type}/${id}`).then((res) =>
        res.json()
      ),
    queryKey: ["reservations"],
  });
};
