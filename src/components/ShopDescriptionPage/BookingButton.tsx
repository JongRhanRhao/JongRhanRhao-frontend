import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import "@/styles/custom-phone-input.css";
import { SERVER_URL } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import toast from "react-hot-toast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";

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
  const [isOverAge, setIsOverAge] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const { user, isAuthenticated } = useUser();
  const { t } = useTranslation();


  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in before making a reservation.");
      return;
    }
    if (!selectedDate || !numberOfPeople || !phoneNumber) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!isOverAge) {
      toast.error("Please confirm that you are over 20 years old.");
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
    note: note,
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
        <div className="border-2 shadow-lg modal-box border-secondary/70 bg-bg text-text">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            {t("bookYourReservation")}
          </h2>
          <div className="mb-4">
            <label className="mr-2 font-bold">{t("date")}:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="d MMMM yyyy"
              className="w-full p-2 mt-1 rounded bg-secondary"
              minDate={new Date()}
            />
          </div>
          <div className="mb-4">
            <div className="font-bold">{t("numberOfPeople")}</div>
            <input
              type="number"
              value={numberOfPeople}
              min={1}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              className="p-2 mt-1 rounded w-fit bg-secondary"
            />
          </div>
          <div className="mb-4 font-bold">{t("slots")}:</div>
          <div className="mb-4">
            <label className="font-bold">{t("phone")}</label>
            <PhoneInput
              defaultCountry="th"
              className="w-full mt-1"
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              placeholder="+66 81 234 5678"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="font-bold mb-">{t("note")}: </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 mt-1 rounded resize-none textarea bg-secondary"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={isOverAge}
              onChange={(e) => setIsOverAge(e.target.checked)}
            />
            <div className="ml-2 text-sm font-semibold text-rose-500">
              {t("overAge")}
            </div>
          </div>
          <p className="mt-3 text-sm text-text/50">
            Staff will call you to confirm your booking.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-end w-full space-x-2">
              <button className="btn text-text rounded-xl">Close</button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 mr-2 font-bold rounded-xl btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
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
