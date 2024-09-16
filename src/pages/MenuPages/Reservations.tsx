import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faX } from "@fortawesome/free-solid-svg-icons";

import BackHomeButton from "@/components/shared/BackHomeButton";
import { useUser } from "@/hooks/useUserStore";
import { useFetchReservations } from "@/hooks/useFetchReservations";
import LinkBack from "@/components/shared/LinkBack";
import { ERROR_TEXT, RESERVATION_STATUS, SERVER_URL } from "@/lib/variables";
import { FilterButton } from "@/components/shared/FilterButton";

const Reservations = () => {
  const user = useUser();
  const { t } = useTranslation();
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

  const isPending = (reservStatus: string) =>
    reservStatus === RESERVATION_STATUS.PENDING ? "animate-pulse" : "";
  const isCancelled = (reservStatus: string) =>
    reservStatus === RESERVATION_STATUS.CANCELLED ? true : false;
  const isConfirmed = (reservStatus: string) =>
    reservStatus === RESERVATION_STATUS.CONFIRMED ? true : false;

  useEffect(() => {
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
  }, [reservation, refetchReservation]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-xl text-text">
        You need to log in to view this page.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
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

  const handleCancelReserv = async (reservationId: string) => {
    try {
      await axios.put(
        `${SERVER_URL}/stores/api/reservations/status/${reservationId}`,
        {
          reservationId: reservationId,
          reservationStatus: RESERVATION_STATUS.CANCELLED,
        }
      );
      socket.emit("reservation_update", { reservationId });
    } catch (err) {
      console.error("Error updating reservation status:", err);
    }
  };

  const updateCancelReserv = (reservationId: string) => {
    toast.promise(handleCancelReserv(reservationId), {
      loading: "Cancelling...",
      success: "Cancelled successfully!",
      error: "Error cancelling, please try again.",
    });
  };

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

  const filteredReservationsByStatus = (status: string) => {
    if (status === "All") return Array.isArray(reservation) ? reservation : [];
    return Array.isArray(reservation)
      ? reservation.filter((reserv) => reserv.reservation_status === status)
      : [];
  };

  return (
    <div>
      <LinkBack />
      <div className="mb-4 text-2xl font-bold text-text">
        {t("reservation")}
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
        <table className="table w-full min-w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("id_reservation")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text hidden md:table-cell">
                {t("shop_name")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text hidden sm:table-cell">
                {t("dateNtime")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("status")}
              </th>
              <th className="w-1/4 font-bold text-left uppercase text-text">
                {t("action")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary text-text">
            {Array.isArray(filteredReservationsByStatus(selectedStatus)) &&
              filteredReservationsByStatus(selectedStatus).map(
                (reservation) => {
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
                      <td className="px-6 py-4 truncate border-b border-neutral-500 hidden md:table-cell">
                        {reservation.shop_name}
                      </td>
                      <td className="px-6 py-4 border-b border-neutral-500 hidden sm:table-cell">
                        {format(new Date(reservation.reservation_date), "PPP")},{" "}
                        {reservation.reservation_time}
                      </td>
                      <td className="px-6 py-4 border-b border-neutral-500">
                        <span
                          className={`${isPending(
                            reservation.reservation_status
                          )} px-2 py-1 text-sm rounded-full uppercase ${statusColorClass}`}
                        >
                          {t(reservation.reservation_status)}
                        </span>
                      </td>
                      <td className="border-b border-neutral-500">
                        <button
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
                        </button>
                        <a
                          href={`/shop/${reservation.shop_id}`}
                          className="underline text-text/75"
                        >
                          <FontAwesomeIcon icon={faShop} />
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
