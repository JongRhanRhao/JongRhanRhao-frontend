import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faNoteSticky,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { th } from "date-fns/locale";

import i18n from "@/helper/i18n";
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
import { useFetchAvailability } from "@/hooks/useFetchAvailability";
import { useFetchReservationsByShopIdAndDate } from "@/hooks/useFetchReservationsByShopIdAndDate";

const BookingButton = ({
  storeId,
  storeName,
}: {
  storeId: string;
  storeName: string;
}) => {
  const { user, isAuthenticated } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const { data: reservations, refetch: refetchReservations } =
    useFetchReservationsByShopIdAndDate(
      storeId,
      format(selectedDate || new Date(), "yyyy-MM-dd")
    );
  const [isOverAge, setIsOverAge] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const { data: availability, refetch: refetchAvailability } =
    useFetchAvailability(
      storeId,
      format(selectedDate || new Date(), "yyyy-MM-dd"),
      format(selectedDate || new Date(), "yyyy-MM-dd")
    );
  const isReservable = availability?.[0].isReservable;
  const { t } = useTranslation();

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    socket.on("reservation_update", () => {
      refetchReservations();
    });
    return () => {
      socket.off("reservation_update");
    };
  }, [refetchReservations]);

  useEffect(() => {
    socket.on("store_update", (data) => {
      if (data) {
        refetchAvailability();
      }
    });

    return () => {
      socket.off("store_update");
    };
  }, [refetchAvailability]);

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
    (document.getElementById("BookingButton") as HTMLDialogElement)?.close();
    setShowConfirmModal(true);
  };

  const formattedDate = selectedDate
    ? format(selectedDate, "d MMM yyyy", {
        locale: i18n.language === "th" ? th : undefined,
      })
    : "";
  const bookingData = {
    customerId: user?.userId,
    shopId: storeId,
    reservationDate: format(selectedDate || new Date(), "d MMM yyyy"),
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
    setShowConfirmModal(false);
  };

  const totalBookedSeatsbyDate = Array.isArray(reservations)
    ? reservations.reduce(
        (acc, curr) =>
          curr.reservations.reservationStatus !== RESERVATION_STATUS.CANCELLED
            ? acc + (curr.reservations.numberOfPeople || 0)
            : acc,
        0
      )
    : 0;

  const availableSeats = useMemo(() => {
    const availableSlots = availability?.map(
      (slot: { availableSeats: number }) => slot.availableSeats
    );
    const firstSlot = availableSlots?.[0];
    return typeof firstSlot === "number"
      ? firstSlot - totalBookedSeatsbyDate
      : 0;
  }, [availability, totalBookedSeatsbyDate]);

  const handleEditBookingButton = () => {
    setShowConfirmModal(false);
    (
      document.getElementById("BookingButton") as HTMLDialogElement
    )?.showModal();
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <button
          className={`w-48 px-4 py-2 font-bold rounded-xl ${CUSTOM_BUTTON_CLASS}`}
          onClick={() =>
            (
              document.getElementById("BookingButton") as HTMLDialogElement
            )?.showModal()
          }
          disabled={!isReservable}
        >
          {isReservable ? t("BOOK NOW") : t("Closed for booking")}
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
          <div className="flex flex-col mb-4 w-fit">
            <label className="mr-2 font-bold">{t("date")}</label>
            <BookingCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              storeId={storeId}
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
          <div
            className={`mb-4 font-bold ${
              availableSeats === 0 ? "text-rose-500" : "text-text"
            }`}
          >
            {t("slots")}:{" "}
            {availableSeats === 0 ? t("Fully Booked") : availableSeats}
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
              maxLength={100}
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-error"
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
                disabled={availableSeats === 0 || !note}
                className="px-4 py-2 mr-2 font-bold rounded-xl btn bg-primary text-secondary hover:bg-secondary hover:text-primary"
              >
                {t("BOOK NOW")}
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Confirm modal */}
      <dialog
        id="confirm_modal"
        className={`modal ${showConfirmModal ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="border-2 shadow-lg modal-box bg-bg border-secondary/70"
        >
          {" "}
          <h3 className="mb-4 text-xl font-bold text-primary">
            {t("Confirm Booking")} <span>{t(storeName)}</span>
          </h3>
          <div className="p-2 mb-2 bg-secondary rounded-xl">
            <strong>{t("customerName")}:</strong> {user?.userName}
          </div>
          <div className="p-4 mb-2 bg-secondary rounded-xl">
            <p className="mb-2 font-bold underline text-text">
              {t("Booking Information")}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              <strong>{t("Booking date")}:</strong> {formattedDate}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <strong>{t("Booking Time")}:</strong>{" "}
              {bookingData.reservationTime} {i18n.language === "th" ? "น." : ""}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <strong>{t("numberOfPeople")}:</strong> {numberOfPeople}{" "}
              {i18n.language === "th" ? "คน" : ""}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <strong>{t("phone")}:</strong> {phoneNumber}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faNoteSticky} className="mr-2" />
              <strong>{t("note")}:</strong> {note === "" ? t("N/A") : note}
            </p>
          </div>
          <div className="modal-action">
            <button
              onClick={() => handleEditBookingButton()}
              className="btn bg-secondary text-text"
            >
              {t("Edit Booking")}
            </button>
            <button onClick={BookingStatus} className={CUSTOM_BUTTON_CLASS}>
              {t("Confirm Booking")}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default BookingButton;
