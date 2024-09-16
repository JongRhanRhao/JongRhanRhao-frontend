import axios from "axios";
import { useState } from "react";

import { RESERVATION_STATUS, SERVER_URL } from "@/lib/variables";
import { socket } from "@/socket";

const ReservationsStatusSelector = ({
  currentStatus,
  reservationId,
  className,
}: {
  currentStatus: string;
  reservationId: string;
  className?: string;
}) => {
  const [status, setStatus] = useState(currentStatus);

  switch (status) {
    case RESERVATION_STATUS.PENDING:
      className = "text-yellow-500 border-yellow-500 bg-yellow-500/30";
      break;
    case RESERVATION_STATUS.CONFIRMED:
      className = "bg-primary/30 text-primary border-primary";
      break;
    case RESERVATION_STATUS.CANCELLED:
      className = "text-red-500 border-red-500 bg-red-500/30";
      break;
    default:
      className = "text-yellow-500 border-yellow-500 bg-yellow-500/30";
  }

  const updateReservationStatus = async (newStatus: string) => {
    try {
      await axios.put(
        `${SERVER_URL}/stores/api/reservations/status/${reservationId}`,
        {
          reservationId: reservationId,
          reservationStatus: newStatus,
        }
      );
      socket.emit("reservation_update", { reservationId });
      setStatus(newStatus);
    } catch (err) {
      console.error("Error updating reservation status:", err);
    }
  };

  return (
    <>
      <select
        className={`px-2 py-1 text-sm  border ${className} w-full`}
        value={status}
        onChange={(e) => updateReservationStatus(e.target.value)}
      >
        <option value={`${RESERVATION_STATUS.PENDING}`}>
          {RESERVATION_STATUS.PENDING}
        </option>
        <option value={`${RESERVATION_STATUS.CONFIRMED}`}>
          {RESERVATION_STATUS.CONFIRMED}
        </option>
        <option value={`${RESERVATION_STATUS.CANCELLED}`}>
          {RESERVATION_STATUS.CANCELLED}
        </option>
      </select>
    </>
  );
};

export default ReservationsStatusSelector;
