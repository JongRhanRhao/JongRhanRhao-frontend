import axios from "axios";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import { socket } from "@/socket";
import "@/styles/custom-phone-input.css";
import {
  CUSTOM_BUTTON_CLASS,
  RESERVATION_STATUS,
  SERVER_URL,
} from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import LoginButton from "@/components/shared/LoginButton";
import BookingCalendar from "@/components/ShopDescriptionPage/BookingCalendar";
import { useFetchReservations } from "@/hooks/useFetchReservations";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const BookingButton = ({
  disabled,
  storeId,
  storeName,
}: {
  disabled: boolean;
  storeId: string;
  storeName: string;
}) => {
  const { user, isAuthenticated } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const { data: reservations } = useFetchReservations({
    type: "store",
    id: storeId || "",
  });
  const [isOverAge, setIsOverAge] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedDate || !numberOfPeople || !phoneNumber || !note) {
      toast.error(t("Please fill in all fields."));
      return;
    }
    if (phoneNumber.length < 10) {
      toast.error(t("Please enter a valid phone number."));
      return;
    }
    if (!isOverAge) {
      toast.error(t("Please confirm that you are over 20 years old."));
      return;
    }
    BookingStatus();
  };

  const formattedDate = selectedDate ? format(selectedDate, "d MMM yyyy") : "";
  const bookingData = {
    customerId: user?.userId,
    shopId: storeId,
    reservationDate: formattedDate,
    reservationTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    numberOfPeople: numberOfPeople,
    phoneNumber: phoneNumber,
    note: note,
    reservationStatus: RESERVATION_STATUS.PENDING,
  };

  const handleBooking = async () => {
    if (availableSeats < numberOfPeople) {
      return Promise.reject("Not enough seats");
    }
    try {
      await axios.post(`${SERVER_URL}/stores/api/reservations`, bookingData);
      (document.getElementById("BookingButton") as HTMLDialogElement)?.close();
      socket.emit("reservation_update", { storeId });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const BookingStatus = () => {
    toast.promise(handleBooking(), {
      loading: t("Booking..."),
      success: t("Booking successfully!"),
      error: t("Something went wrong. Please try again."),
    });
  };

  const totalPeople = Array.isArray(reservations)
    ? reservations
        .map((reservation) => reservation.number_of_people)
        .reduce((acc, curr) => acc + curr, 0)
    : 0;
  // TODO: Change the number of available seats to the actual number of available seats
  const availableSeats = 50 - totalPeople;
  return (
    <>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <button
          disabled={disabled}
          className={`w-48 px-4 py-2 font-bold rounded-xl ${CUSTOM_BUTTON_CLASS}`}
          onClick={() =>
            (
              document.getElementById("BookingButton") as HTMLDialogElement
            )?.showModal()
          }
        >
          {t("BOOK NOW")}
        </button>
      )}
      <dialog
        id="BookingButton"
        className="modal modal-bottom sm:modal-middle md:modal-middle lg:modal-middle xl:modal-middle"
      >
        <div className="border-2 shadow-lg modal-box border-secondary/70 bg-bg text-text">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            {t("bookYourReservation")} {t(storeName)}
          </h2>
          <div className="flex flex-col mb-4">
            <label className="mr-2 font-bold">{t("date")}:</label>
            <BookingCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div className="mb-4">
            <div className="font-bold">{t("numberOfPeople")}</div>
            <input
              type="number"
              value={numberOfPeople}
              min={1}
              max={availableSeats}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              className="p-2 mt-1 rounded-xl w-fit bg-secondary"
            />
          </div>
          <div className="mb-4 font-bold">
            {t("slots")}: {availableSeats}
          </div>
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
            <label className="font-bold">{t("note")}: </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 mt-1 resize-none rounded-xl placeholder:text-text/50 textarea bg-secondary"
              placeholder={t("notePlaceholder")}
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
          <p className="mt-3 text-sm text-text/50">{t("staffWillConfirm")}</p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-end w-full space-x-2">
              <button className="btn text-text bg-secondary rounded-xl">
                {t("Close")}
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 mr-2 font-bold rounded-xl btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
              >
                {t("BOOK NOW")}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookingButton;
