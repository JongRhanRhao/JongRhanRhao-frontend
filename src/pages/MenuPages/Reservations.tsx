import { socket } from "@/socket";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import BackHomeButton from "@/components/shared/BackHomeButton";
import { useUser } from "@/hooks/useUserStore";
import { useFetchReservations } from "@/hooks/useFetchReservations";
import LinkBack from "@/components/shared/LinkBack";
import { ERROR_TEXT } from "@/lib/variables";

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

  // TODO: Add refresh button, control button
  return (
    <div>
      <LinkBack />
      <div className="mb-4 text-2xl font-bold text-text">
        {t("reservation")}
      </div>
      <table className="table w-full table-fixed">
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
            <th className="w-1/4 font-bold text-left uppercase text-text"></th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(reservation) &&
            reservation.map((reservation) => {
              let statusClass = "";
              switch (reservation.reservation_status) {
                case "pending":
                  statusClass =
                    "bg-yellow-500/30 text-yellow-500 border-yellow-500";
                  break;
                case "confirmed":
                  statusClass = "bg-primary/30 text-primary border-primary";
                  break;
                case "cancelled":
                  statusClass = "bg-red-500/30 text-red-500 border-red-500";
                  break;
                default:
                  statusClass =
                    "bg-yellow-500/30 text-yellow-500 border-yellow-500";
              }
              return (
                <tr key={reservation.reservation_id}>
                  <td className="px-6 py-4 border-b border-neutral-500">
                    {reservation.reservation_id}
                  </td>
                  <td className="px-6 py-4 truncate border-b border-neutral-500">
                    {reservation.shop_name}
                  </td>
                  <td className="px-6 py-4 border-b border-neutral-500">
                    {reservation.reservation_date},{" "}
                    {reservation.reservation_time}
                  </td>
                  <td className="px-6 py-4 border-b border-neutral-500">
                    <span
                      className={`animate-pulse px-2 py-1 text-sm rounded-full ${statusClass}`}
                    >
                      {reservation.reservation_status}
                    </span>
                  </td>
                  <td className="border-b border-neutral-500">
                    <a
                      href={`/shop/${reservation.shop_id}`}
                      className="underline text-primary"
                    >
                      View Shop
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
