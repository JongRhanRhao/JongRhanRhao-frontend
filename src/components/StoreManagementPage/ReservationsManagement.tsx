import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faNoteSticky,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { socket } from "@/socket";

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
      socket.on("reservation_update", (data) => {
        console.log(data.storeId);
        if (data.storeId === store.store_id) {
          refetch();
        }
      });
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
      <div className="space-x-2 space-y-4">
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
      <div className=" space-x-2 space-y-4">
        <div className="text-xl font-bold text-text">Reservations</div>
        <div className="text-lg text-text">
          There was an error fetching the data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-text">
        Reservations for {store.shop_name}
      </h2>
      <div className="relative flex items-center p-2 mb-3 rounded bg-secondary w-fit">
        <div className="border-r">
          <FontAwesomeIcon icon={faCalendarDay} className="mr-2 text-primary" />
        </div>
        <DatePicker
          className="w-full p-2 bg-secondary text-text"
          dateFormat={"d MMMM yyyy"}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
        />
      </div>
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
                <td className="px-6 py-4 truncate border-b border-neutral-500 text-center">
                  {reservation.number_of_people}
                  {reservation.note && reservation.note.trim() !== "" && (
                    <button
                      className="btn btn-xs ml-2 bg-secondary text-text border-text"
                      onClick={() => {
                        const noteElement = document.getElementById(
                          `note-${reservation.reservation_id}`
                        ) as HTMLDialogElement;
                        if (noteElement) {
                          noteElement.showModal();
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faNoteSticky} />
                    </button>
                  )}
                  <dialog
                    id={`note-${reservation.reservation_id}`}
                    className="modal text-left"
                  >
                    <div className="modal-box bg-secondary text-text">
                      <div className="font-bold text-lg flex items-center text-primary">
                        <p className="ml-2">{reservation.reservation_id}</p>
                      </div>
                      <div className="text-text text-sm">
                        <p>
                          <FontAwesomeIcon icon={faUser} />{" "}
                          {reservation.user_name}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faPhone} />{" "}
                          <a
                            className="link ml-2"
                            href={`tel:${reservation.phone_number}`}
                          >
                            {reservation.phone_number}
                          </a>
                        </p>
                      </div>
                      <div className="divider"></div>
                      <p>{reservation.note || "No notes."}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {format(new Date(reservation.reservation_date), "PPP")},{" "}
                  {reservation.reservation_time}
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
