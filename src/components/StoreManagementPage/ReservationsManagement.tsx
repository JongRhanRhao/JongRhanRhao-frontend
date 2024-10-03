import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDay,
  faNoteSticky,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { useTranslation } from "react-i18next";

import { useFetchReservations } from "@/hooks/useFetchReservations";
import { Store } from "@/hooks/useFetchStores";
import ReservationsStatusSelector from "@/components/StoreManagementPage/ReservationsStatusSelector";
import { FilterButton } from "@/components/shared/FilterButton";
import { RESERVATION_STATUS } from "@/lib/variables";
import { socket } from "@/socket";

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
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    "All"
  );
  const { t, i18n } = useTranslation();

  const filteredReservations = Array.isArray(reservation)
    ? reservation
        .filter((res) => {
          const matchesDate =
            selectedDate &&
            new Date(res.reservation_date).toDateString() ===
              selectedDate.toDateString();
          const matchesStatus =
            selectedStatus === "All" ||
            res.reservation_status === selectedStatus;
          return matchesDate && matchesStatus;
        })
        .sort((a, b) => {
          const timeA = new Date(
            `1970-01-01T${a.reservation_time}:00`
          ).getTime();
          const timeB = new Date(
            `1970-01-01T${b.reservation_time}:00`
          ).getTime();
          return timeB - timeA;
        })
    : [];

  useEffect(() => {
    if (store?.store_id) {
      refetch();
    }
    socket.on("reservation_update", (data) => {
      if (data) {
        refetch();
      }
    });
    return () => {
      socket.off("reservation_update");
    };
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
      <div className="space-x-2 space-y-4">
        <div className="text-xl font-bold text-text">Reservations</div>
        <div className="text-lg text-text">
          There was an error fetching the data. Please try again later.
        </div>
      </div>
    );
  }

  const FilterBtnClass = (reservationStatus: string) => {
    switch (reservationStatus) {
      case RESERVATION_STATUS.PENDING:
        return "border-yellow-500";
      case RESERVATION_STATUS.CONFIRMED:
        return "bg-primary text-primary border-primary";
      case RESERVATION_STATUS.CANCELLED:
        return "text-red-500 border-red-500";
      default:
        return "";
    }
  };

  const TotalPeopleByDate = (date: Date) => {
    const totalPeople = filteredReservations.reduce((acc, res) => {
      if (
        new Date(res.reservation_date).toDateString() === date.toDateString()
      ) {
        return acc + res.number_of_people;
      }
      return acc;
    }, 0);
    return totalPeople;
  };

  const TotalReservationByDate = (date: Date) => {
    const totalReservations = filteredReservations.filter(
      (res) =>
        new Date(res.reservation_date).toDateString() === date.toDateString()
    ).length;
    return totalReservations;
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-text">
        {t("Reservations for")} {t(store.shop_name)}
      </h2>
      <div className="relative flex items-center p-1 rounded bg-secondary w-fit">
        <button
          onClick={() =>
            setSelectedDate(
              new Date((selectedDate?.getTime() || Date.now()) - 86400000)
            )
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-primary" />
        </button>
        <div className="border-r">
          <FontAwesomeIcon
            icon={faCalendarDay}
            className="mr-2 ml-7 text-primary"
          />
        </div>
        <DatePicker
          className="w-full p-2 bg-secondary text-text"
          dateFormat={"d MMMM yyyy"}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
          locale={i18n.language === "th" ? th : undefined}
        />
        <button
          onClick={() =>
            setSelectedDate(
              new Date((selectedDate?.getTime() || Date.now()) + 86400000)
            )
          }
        >
          <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-primary" />
        </button>
      </div>
      <div className="my-4">
        <div className="space-x-1 space-y-1">
          <FilterButton
            onClick={() => setSelectedStatus("All")}
            selectedTitle={selectedStatus}
            title="All"
            className={FilterBtnClass("All")}
          />
          <FilterButton
            onClick={() => setSelectedStatus(RESERVATION_STATUS.PENDING)}
            selectedTitle={selectedStatus}
            title={RESERVATION_STATUS.PENDING}
            className={FilterBtnClass(RESERVATION_STATUS.PENDING)}
          />
          <FilterButton
            onClick={() => setSelectedStatus(RESERVATION_STATUS.CANCELLED)}
            selectedTitle={selectedStatus}
            title={RESERVATION_STATUS.CANCELLED}
            className={FilterBtnClass(RESERVATION_STATUS.CANCELLED)}
          />
          <FilterButton
            onClick={() => setSelectedStatus(RESERVATION_STATUS.CONFIRMED)}
            selectedTitle={selectedStatus}
            title={RESERVATION_STATUS.CONFIRMED}
            className={FilterBtnClass(RESERVATION_STATUS.CONFIRMED)}
          />
        </div>
        <div className="flex mt-2 gap-2">
          <p className="p-1 font-semibold rounded bg-secondary text-text">
            {t("reservCount")}:{" "}
            {selectedDate ? TotalReservationByDate(selectedDate) : 0}
          </p>
          <p className="p-1 font-semibold rounded bg-secondary text-text">
            {t("numbOfPpl")}:{" "}
            {selectedDate ? TotalPeopleByDate(selectedDate) : 0}
          </p>
        </div>
      </div>
      <table className="table w-full table-fixed overflow-x-scroll">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("id_reservation")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("customerName")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("numberOfPeople")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("dateNtime")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("phone")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("action")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(filteredReservations) &&
          filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {reservation.reservation_id}
                </td>
                <td className="px-6 py-4 truncate border-b border-neutral-500">
                  {reservation.user_name}
                </td>
                <td className="px-6 py-4 text-center truncate border-b border-neutral-500">
                  {reservation.number_of_people}
                  {reservation.note && reservation.note.trim() !== "" && (
                    <button
                      className="ml-2 btn btn-xs bg-secondary text-text border-text"
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
                    className="text-left modal"
                  >
                    <div className="modal-box bg-secondary text-text">
                      <div className="flex items-center text-lg font-bold text-primary">
                        <p className="ml-2">{reservation.reservation_id}</p>
                      </div>
                      <div className="text-sm text-text">
                        <p>
                          <FontAwesomeIcon icon={faUser} />{" "}
                          {reservation.user_name}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faPhone} />{" "}
                          <a
                            className="ml-2 link"
                            href={`tel:${reservation.phone_number}`}
                          >
                            {reservation.phone_number}
                          </a>
                        </p>
                      </div>
                      <div className="divider"></div>
                      <p className="mb-1 text-text/50">Notes:</p>
                      <p>{reservation.note || "No notes."}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
                <td className="hidden px-6 py-4 border-b border-neutral-500 sm:table-cell">
                  {format(new Date(reservation.reservation_date), "PPP", {
                    locale: i18n.language === "th" ? th : undefined,
                  })}
                  , {reservation.reservation_time}
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
              <td colSpan={6} className="py-4 text-center">
                {t("noReservFound")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsManagement;
