import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { format } from "date-fns";

import "@/styles/custom-phone-input.css";
import { SERVER_URL } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import toast from "react-hot-toast";

const BookingButton = ({
  disabled,
  storeId,
}: {
  disabled: boolean;
  storeId: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { user, isAuthenticated } = useUser();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in before making a reservation.");
      return;
    }
    if (!selectedDate || !numberOfPeople || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }
    BookingStatus();
  };

  const formattedDate = selectedDate ? format(selectedDate, "d MMM yyyy") : "";
  const bookingData = {
    customerId: user?.userId,
    shopId: storeId,
    reservationDate: formattedDate,
    reservationTime: new Date().toLocaleTimeString(),
    numberOfPeople: numberOfPeople,
    phoneNumber: phoneNumber,
    reservationStatus: "pending",
  };

  const handleBooking = async () => {
    try {
      await axios.post(`${SERVER_URL}/stores/api/reservations`, bookingData);
      (document.getElementById("BookingButton") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  const BookingStatus = () => {
    toast.promise(handleBooking(), {
      loading: "Booking...",
      success: "Booking successfully!",
      error: "Error booking, please try again.",
    });
  };

  // TODO: phone number field validation
  return (
    <>
      <button
        disabled={disabled}
        className="w-48 px-4 py-2 font-bold btn bg-primary text-secondary rounded-xl hover:bg-secondary hover:text-primary"
        onClick={() =>
          (
            document.getElementById("BookingButton") as HTMLDialogElement
          )?.showModal()
        }
      >
        BOOK NOW
      </button>
      <dialog
        id="BookingButton"
        className="modal modal-bottom sm:modal-middle md:modal-middle lg:modal-middle xl:modal-middle"
      >
        <div className="modal-box bg-secondary text-text">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Book Your Reservation
          </h2>
          <div className="mb-4">
            <label className="mr-2 font-bold">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="d MMMM yyyy"
              className="w-full p-2 mt-1 rounded bg-bg"
              minDate={new Date()}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Number of People:</label>
            <input
              type="number"
              value={numberOfPeople}
              min={1}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              className="w-full p-2 mt-1 rounded bg-bg"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Phone:</label>
            <PhoneInput
              defaultCountry="th"
              className="w-full mt-1"
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              placeholder="+66 81 234 5678"
            />
          </div>
          <p className="text-sm">
            Staff will call you to confirm your booking.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-end w-full space-x-2">
              <button className="btn text-text">Close</button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 mr-2 font-bold rounded btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookingButton;
