import axios from "axios";
import { useState } from "react";

import { SERVER_URL } from "@/lib/variables";
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
    case "pending":
      className = "bg-yellow-500/30 text-yellow-500 border-yellow-500";
      break;
    case "confirmed":
      className = "bg-primary/30 text-primary border-primary";
      break;
    case "cancelled":
      className = "bg-red-500/30 text-red-500 border-red-500";
      break;
    default:
      className = "bg-yellow-500/30 text-yellow-500 border-yellow-500";
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
    <div>
      <select
        className={`px-2 py-1 text-sm  border ${className}`}
        value={status}
        onChange={(e) => updateReservationStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default ReservationsStatusSelector;
