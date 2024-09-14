import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faPhone } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

import { useFetchReservations } from "@/hooks/useFetchReservations";
import { Store } from "@/hooks/useFetchStores";
import ReservationsStatusSelector from "@/components/StoreManagementPage/ReservationsStatusSelector";

// TODO: more data description
const ReservationsManagement = ({ store }: { store: Store | null }) => {
  const {
    data: reservation,
    isLoading,
    error,
    refetch,
  } = useFetchReservations({
    type: "store",
    id: store?.store_id || "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(Date.now())
  );

  const filteredReservationsByDate = Array.isArray(reservation)
    ? reservation.filter(
        (res) =>
          new Date(res.reservation_date).toDateString() ===
          selectedDate?.toDateString()
      )
    : [];

  useEffect(() => {
    if (store?.store_id) {
      refetch();
    }
  }, [store?.store_id, refetch]);

  if (!store) {
    return (
      <p className="text-lg text-text">
        Please select a store to view reservations.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <table className="table w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                id reservation
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                customer name
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                number of people
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                customer id
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                date & time
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                Phone
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                action
              </th>
            </tr>
          </thead>
        </table>
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <div className="text-xl font-bold text-text">Reservations</div>
        <div className="text-lg text-text">
          There was an error fetching the data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="mb-4 text-xl font-bold text-text">
        Reservations for {store.shop_name}
      </h2>
      <FontAwesomeIcon icon={faCalendarDay} className="text-primary" /> :{" "}
      <DatePicker
        className="w-full p-2 mt-1 rounded bg-secondary mb-3 text-text"
        dateFormat={"d MMMM yyyy"}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Select a date"
      />
      <table className="table w-full table-fixed">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              id reservation
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              customer name
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              number of people
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              date & time
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              Phone
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              action
            </th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(reservation) && reservation.length > 0 ? (
            filteredReservationsByDate.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {reservation.reservation_id}
                </td>
                <td className="px-6 py-4 truncate border-b border-neutral-500">
                  {reservation.user_name}
                </td>
                <td className="px-6 py-4 truncate border-b border-neutral-500">
                  {reservation.number_of_people}
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {reservation.reservation_date}, {reservation.reservation_time}
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  <a className="link" href={`tel:${reservation.phone_number}`}>
                    {reservation.phone_number}
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="ml-2 text-primary"
                    />
                  </a>
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  <ReservationsStatusSelector
                    currentStatus={reservation.reservation_status}
                    reservationId={reservation.reservation_id}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                No reservations found for this store.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsManagement;
