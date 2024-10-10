import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
// import axios from "axios";
// import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDay,
  faHistory,
  faShop,
  // faX,
} from "@fortawesome/free-solid-svg-icons";
import { th } from "date-fns/locale";
import DatePicker from "react-datepicker";

import { socket } from "@/socket";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { useUser } from "@/hooks/useUserStore";
import { useFetchReservations } from "@/hooks/useFetchReservations";
import LinkBack from "@/components/shared/LinkBack";
import { ERROR_TEXT, RESERVATION_STATUS } from "@/lib/variables";
import { FilterButton } from "@/components/shared/FilterButton";
import LoginButton from "@/components/shared/LoginButton";

const Reservations = () => {
  const user = useUser();
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = user;
  const {
    data: reservation,
    isLoading,
    error,
    refetch: refetchReservation,
  } = useFetchReservations({
    type: "customer",
    id: user.user?.userId?.toString() || "",
  });
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const isPending = (reservStatus: string) =>
    reservStatus === RESERVATION_STATUS.PENDING ? "animate-pulse" : "";
  // const isCancelled = (reservStatus: string) =>
  //   reservStatus === RESERVATION_STATUS.CANCELLED ? true : false;
  // const isConfirmed = (reservStatus: string) =>
  //   reservStatus === RESERVATION_STATUS.CONFIRMED ? true : false;

  useEffect(() => {
    if (!isAuthenticated) return;
    if (reservation) {
      socket.on("reservation_update", (data) => {
        if (data.reservationId) {
          refetchReservation();
        }
      });
    }
    return () => {
      socket.off("reservation_update");
    };
  }, [isAuthenticated, reservation, refetchReservation]);

  if (!isAuthenticated) {
    return (
      <>
        <LinkBack />
        <div className="flex flex-col items-center justify-center mt-20 text-xl text-text">
          {t("You need to log in to view this page.")}
          <LoginButton className="mt-4" />
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="space-x-2 space-y-4">
        <div className="text-2xl font-bold text-text"> {t("reservation")}</div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("id_reservation")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("shop_name")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("dateNtime")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("status")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg">
            <tr>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-2xl text-text mt-14">
        {ERROR_TEXT}
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  // const handleCancelReserv = async (reservationId: string) => {
  //   try {
  //     await axios.put(
  //       `${SERVER_URL}/stores/api/reservations/status/${reservationId}`,
  //       {
  //         reservationId: reservationId,
  //         reservationStatus: RESERVATION_STATUS.CANCELLED,
  //       }
  //     );
  //     socket.emit("reservation_update", { reservationId });
  //   } catch (err) {
  //     toast.error(t("Something went wrong. Please try again."));
  //   }
  // };

  // const updateCancelReserv = (reservationId: string) => {
  //   toast.promise(handleCancelReserv(reservationId), {
  //     loading: t("Cancelling..."),
  //     success: t("Cancelled successfully!"),
  //     error: t("Something went wrong. Please try again."),
  //   });
  // };

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

  const TotalReservationByDate = (date: Date) => {
    const totalReservations = filteredReservations.filter(
      (res) =>
        new Date(res.reservation_date).toDateString() === date.toDateString()
    ).length;
    return totalReservations;
  };

  return (
    <div>
      <LinkBack />
      <div className="mb-4 text-2xl font-bold text-text">
        {t("reservation")}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center p-1 rounded bg-secondary w-fit">
          <button
            onClick={() =>
              setSelectedDate(
                new Date((selectedDate?.getTime() || Date.now()) - 86400000)
              )
            }
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="ml-2 mr-2 text-primary"
            />
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
            <FontAwesomeIcon
              icon={faArrowRight}
              className="mr-2 text-primary"
            />
          </button>
        </div>
        <div className="relative cursor-pointer group">
          <button
            onClick={() =>
              (
                document.getElementById(
                  "booking_history_modal"
                ) as HTMLDialogElement
              )?.showModal()
            }
          >
            <FontAwesomeIcon icon={faHistory} className="mr-2 text-primary" />
            <div
              className="absolute z-10 px-2 py-1 mt-1 text-sm rounded opacity-0 transition-opacity duration-300 -translate-x-1/2 top-full left-1/2 text-text bg-secondary group-hover:opacity-100"
              role="tooltip"
            >
              {t("Booking History")}
            </div>
          </button>
          <dialog id="booking_history_modal" className="modal">
            <div className="modal-box bg-secondary text-text">
              <form method="dialog">
                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="mb-4 text-lg font-bold text-primary">
                {t("Booking History")}
              </h3>
              {Array.isArray(reservation) && reservation.length > 0 ? (
                <table className="table w-full min-w-full table-fixed rounded-xl">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-2 py-1 font-bold text-left uppercase text-text">
                        {t("id_reservation")}
                      </th>
                      <th className="px-2 py-1 font-bold text-left uppercase text-text">
                        {t("shop_name")}
                      </th>
                      <th className="px-2 py-1 font-bold text-left uppercase text-text">
                        {t("dateNtime")}
                      </th>
                      <th className="px-2 py-1 font-bold text-left uppercase text-text">
                        {t("status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-secondary">
                    {reservation
                      .sort(
                        (a, b) =>
                          new Date(b.reservation_date).getTime() -
                          new Date(a.reservation_date).getTime()
                      )
                      .map((res) => (
                        <tr key={res.reservation_id}>
                          <td className="px-2 py-1 border-b border-neutral-500">
                            {res.reservation_id}
                          </td>
                          <td className="px-2 py-1 border-b border-neutral-500">
                            {t(res.shop_name)}
                          </td>
                          <td className="px-2 py-1 border-b border-neutral-500">
                            {format(new Date(res.reservation_date), "PPP", {
                              locale: i18n.language === "th" ? th : undefined,
                            })}
                            , {res.reservation_time}{" "}
                            {i18n.language === "th" ? "น." : ""}
                          </td>
                          <td className="px-2 py-1 border-b border-neutral-500">
                            {t(res.reservation_status)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">{t("noReservFound")}</div>
              )}
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex mt-2 gap-2">
        <p className="p-1 font-semibold rounded text-text">
          {t("Total Reservations")}:{" "}
          {TotalReservationByDate(selectedDate || new Date())}
        </p>
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
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full min-w-full table-fixed rounded-xl">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("id_reservation")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("shop_name")}
              </th>
              <th className="hidden w-1/4 px-6 py-4 font-bold text-left uppercase text-text md:table-cell">
                {t("dateNtime")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("status")}
              </th>
              <th className="hidden w-1/4 font-bold text-left uppercase text-text md:table-cell">
                {t("action")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary text-text">
            {Array.isArray(filteredReservations) &&
            filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => {
                let statusColorClass = "";
                switch (reservation.reservation_status) {
                  case RESERVATION_STATUS.PENDING:
                    statusColorClass =
                      "bg-yellow-500/30 text-yellow-500 border-yellow-500";
                    break;
                  case RESERVATION_STATUS.CONFIRMED:
                    statusColorClass =
                      "bg-primary/30 text-primary border-primary";
                    break;
                  case RESERVATION_STATUS.CANCELLED:
                    statusColorClass =
                      "bg-red-500/30 text-red-500 border-red-500";
                    break;
                  default:
                    statusColorClass =
                      "bg-yellow-500/30 text-yellow-500 border-yellow-500";
                }
                return (
                  <tr key={reservation.reservation_id}>
                    <td className="px-6 py-4 border-b border-neutral-500">
                      {reservation.reservation_id}
                    </td>
                    <td className="px-6 py-4 truncate border-b border-neutral-500">
                      {t(reservation.shop_name)}
                    </td>
                    <td className="hidden px-6 py-4 border-b border-neutral-500 md:table-cell">
                      {format(new Date(reservation.reservation_date), "PPP", {
                        locale: i18n.language === "th" ? th : undefined,
                      })}
                      , {reservation.reservation_time}{" "}
                      {i18n.language === "th" ? "น." : ""}
                    </td>
                    <td className="px-6 py-4 border-b border-neutral-500">
                      <span
                        className={`${isPending(
                          reservation.reservation_status
                        )} px-2 py-1 text-sm rounded-full ${statusColorClass}`}
                      >
                        {t(reservation.reservation_status)}
                      </span>
                    </td>
                    <td className="hidden border-b border-neutral-500 md:table-cell">
                      {/* <button
                        onClick={() => {
                          updateCancelReserv(reservation.reservation_id);
                        }}
                        className="mr-2 btn btn-outline btn-xs text-rose-500 hover:bg-rose-500/70 hover:border-rose-500"
                        disabled={
                          isCancelled(reservation.reservation_status) ||
                          isConfirmed(reservation.reservation_status)
                        }
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button> */}
                      <a
                        href={`/shop/${reservation.shop_id}`}
                        className="underline text-text/75"
                      >
                        <FontAwesomeIcon icon={faShop} />
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  {t("noReservFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
