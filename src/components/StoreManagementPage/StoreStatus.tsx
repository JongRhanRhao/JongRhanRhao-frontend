import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { th } from "date-fns/locale";
import DatePicker from "react-datepicker";

import { socket } from "@/socket";
import { Store } from "@/hooks/useFetchStores";
import {
  CUSTOM_BUTTON_CLASS,
  SERVER_URL,
  STORE_MGMT_STATUS,
  STORE_TYPES_FOR_SELECTOR,
} from "@/lib/variables";
import { FilterButton } from "@/components/shared/FilterButton";
import i18n from "@/helper/i18n";
import { useFetchAvailability } from "@/hooks/useFetchAvailability";
import { useFetchReservationsByShopIdAndDate } from "@/hooks/useFetchReservationsByShopIdAndDate";

const StoreStatus = ({ store }: { store: Store | null }) => {
  const splitOldTime = store?.open_timebooking.split(" - ");
  const storeId = store?.store_id;
  const [status, setStatus] = useState(store?.status);
  const [selectedStoreTypes, setSelectedStoreTypes] = useState<string[]>(
    store?.type || []
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data: availability, refetch: refetchAvailability } =
    useFetchAvailability(
      storeId || "",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    );
  const [openingTime, setOpeningTime] = useState(
    splitOldTime ? splitOldTime[0] || "" : ""
  );
  const [description, setDescription] = useState(store?.description);
  const [closingTime, setClosingTime] = useState(
    splitOldTime ? splitOldTime[1] || "" : ""
  );
  const [address, setAddress] = useState(store?.address);
  const [googleMapLink, setGoogleMapLink] = useState(store?.google_map_link);
  const [facebookLink, setFacebookLink] = useState(store?.facebook_link);
  const [defaultSeats, setDefaultSeats] = useState(store?.default_seats);
  const [customSeats, setCustomSeats] = useState<number | undefined>(
    availability?.[0]?.availableSeats ?? store?.default_seats
  );
  const [isReservable, setIsReservable] = useState(
    availability?.[0]?.isReservable
  );
  const { data: reservations } = useFetchReservationsByShopIdAndDate(
    storeId || "",
    format(selectedDate || new Date(), "yyyy-MM-dd")
  );
  const totalBookedSeatsbyDate = Array.isArray(reservations)
    ? reservations.reduce(
        (acc, curr) =>
          curr.reservations.reservationStatus === "Confirmed"
            ? acc + (curr.reservations.numberOfPeople || 0)
            : acc,
        0
      )
    : 0;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diffChanges, setDiffChanges] = useState<{
    [key: string]: {
      old: string | number | boolean | string[] | undefined;
      new: string | number | boolean | string[] | undefined;
    };
  }>({});

  const getDiffChanges = () => {
    const changes: { [key: string]: { old: unknown; new: unknown } } = {};

    if (status !== store?.status) {
      changes.status = { old: store?.status, new: status };
    }
    if (JSON.stringify(selectedStoreTypes) !== JSON.stringify(store?.type)) {
      changes.type = { old: store?.type, new: selectedStoreTypes };
    }
    if (description !== store?.description) {
      changes.description = { old: store?.description, new: description };
    }
    if (newOpeningTime !== store?.open_timebooking) {
      changes.openTimeBooking = {
        old: store?.open_timebooking,
        new: newOpeningTime,
      };
    }
    if (address !== store?.address) {
      changes.address = { old: store?.address, new: address };
    }
    if (googleMapLink !== store?.google_map_link) {
      changes.googleMapLink = {
        old: store?.google_map_link,
        new: googleMapLink,
      };
    }
    if (facebookLink !== store?.facebook_link) {
      changes.facebookLink = { old: store?.facebook_link, new: facebookLink };
    }
    if (defaultSeats !== store?.default_seats) {
      changes.defaultSeats = { old: store?.default_seats, new: defaultSeats };
    }
    if (customSeats !== availability?.[0]?.availableSeats) {
      changes.availableSeats = {
        old: availability?.[0]?.availableSeats,
        new: customSeats,
      };
    }
    if (isReservable !== availability?.[0]?.isReservable) {
      changes.isReservable = { old: true, new: isReservable };
    }
    return changes;
  };

  const openModal = () => {
    const changes = getDiffChanges();
    setDiffChanges(
      changes as {
        [key: string]: {
          old: string | number | boolean | string[] | undefined;
          new: string | number | boolean | string[] | undefined;
        };
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (storeId) {
      refetchAvailability();
    }
  }, [storeId, selectedDate, refetchAvailability]);

  useEffect(() => {
    if (availability?.[0]?.isReservable !== undefined) {
      setIsReservable(availability?.[0]?.isReservable);
    }
  }, [availability]);

  useEffect(() => {
    const availableSeats = availability?.[0]?.availableSeats;
    setCustomSeats(
      availableSeats !== undefined ? availableSeats : store?.default_seats
    );
  }, [availability, store?.default_seats]);

  const descriptionMaxLength = 500;
  if (!store) {
    return <p>{t("noStoreSelect")}</p>;
  }
  const handleStatusChange = async () => {
    try {
      await axios.put(`${SERVER_URL}/stores/api/stores/${storeId}`, {
        shopName: store.shop_name,
        openTimeBooking: newOpeningTime,
        cancelReserve: store.cancel_reserve,
        ownerId: store.owner_id,
        staffId: store.staff_id,
        address: address || store.address,
        status: status || store.status,
        isPopular: store.is_popular,
        type: selectedStoreTypes || store.type,
        description: description || store.description,
        imageUrl: store.image_url,
        rating: store.rating,
        googleMapLink: googleMapLink || store.google_map_link,
        facebookLink: facebookLink || store.facebook_link,
        defaultSeats: defaultSeats || store.default_seats,
      });
      handleAvailabilityChange();
      socket.emit("store_update", { storeId });
    } catch (error) {
      console.error("Error updating store:", error);
      throw error;
    }
  };

  const handleAvailabilityChange = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/stores/api/stores/${storeId}/availability`,
        {
          date: format(selectedDate || new Date(), "yyyy-MM-dd"),
          availableSeats: customSeats,
          isReservable,
        },
        { withCredentials: true }
      );
      socket.emit("store_update", { storeId });
    } catch (error) {
      console.error("Error updating availability:", error);
      throw error;
    }
  };

  const handleTypeCheckboxChange = (type: string) => {
    setSelectedStoreTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((selected) => selected !== type)
        : [...prevSelected, type]
    );
  };

  const handleConfirmUpdate = async () => {
    closeModal();
    toast.promise(handleStatusChange(), {
      loading: t("Updating store..."),
      success: t("Store status updated successfully!"),
      error: t("Something went wrong. Please try again."),
    });
  };

  const isTimeChanged = openingTime !== "" || closingTime !== "";

  const newOpeningTime = isTimeChanged
    ? openingTime + " - " + closingTime
    : store.open_timebooking;

  return (
    <div className="flex flex-col text-text">
      <div className="space-y-3">
        <div className="p-4 text-base space-y-3 bg-secondary w-fit rounded-xl">
          <span className="font-bold">
            {t("status")} <br />
          </span>
          {STORE_MGMT_STATUS.map((option) => (
            <FilterButton
              key={option.value}
              title={option.label}
              selectedTitle={status}
              selectedClassName={option.selectedClassName}
              onClick={() => setStatus(option.value)}
              className={`${option.className} flex-grow ml-1 border sm:flex-grow-0`}
            />
          ))}
        </div>
        <div className="p-3 bg-secondary collapse w-fit rounded-xl">
          <input type="checkbox" />
          <span className="font-bold collapse-title">
            {t("defaultSeatsSlots")} <br />
          </span>
          <div className="flex flex-col space-y-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="d MMMM yyyy"
              minDate={new Date()}
              locale={i18n.language === "th" ? th : undefined}
              inline
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
            />
            <p className="text-sm text-text">
              {t("Booking Seats Slots")}{" "}
              {selectedDate
                ? format(selectedDate, "d MMMM yyyy", {
                    locale: i18n.language === "th" ? th : undefined,
                  })
                : ""}
            </p>
            <div className="flex items-center gap-2">
              {availability ? (
                <input
                  disabled={!isReservable}
                  type="number"
                  min={0}
                  className="input input-sm bg-bg/70 text-text w-fit"
                  defaultValue={customSeats || ""}
                  onChange={(e) => setCustomSeats(+e.target.value)}
                />
              ) : (
                <p>{t("No availability data")}</p>
              )}
              <p>{t("Seats")}</p>
            </div>
            <p className="text-sm text-text">
              {t("Booked Seats: ")} {totalBookedSeatsbyDate} {t("Seats")}
            </p>
            <p className="divider"></p>
            <p className="text-sm text-text">{t("Default Available Seats")} </p>
            <div className="flex items-center gap-2">
              {availability ? (
                <input
                  disabled={!isReservable}
                  type="number"
                  className="input input-sm bg-bg/70 text-text w-fit"
                  defaultValue={defaultSeats || 0}
                  min={0}
                  onChange={(e) => setDefaultSeats(+e.target.value)}
                />
              ) : (
                <p>{t("No availability data")}</p>
              )}
              <p>{t("Seats")}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!isReservable}
                onChange={() => setIsReservable(!isReservable)}
                className="checkbox checkbox-error"
              />
              <p className="text-sm text-error">{t("Closed for booking")}</p>
            </div>
          </div>
        </div>
        <div className="w-full collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="font-bold collapse-title">
            {t("storeDescription")}
          </div>
          <div className="collapse-content">
            <textarea
              className="w-full h-auto input bg-secondary textarea textarea-bordered"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={descriptionMaxLength}
            />
            <div className="text-sm text-right text-gray-500">
              {description?.length}/{descriptionMaxLength}
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-secondary w-fit">
          <input type="checkbox" />
          <div className="text-base font-bold collapse-title">
            {t("openingHours")}
          </div>
          <div className="collapse-content">
            <input
              type="time"
              id="appt"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              name="appt"
              step={1800}
              className="p-1 input bg-secondary"
              required
            />
            <span className="m-2 text-center">to</span>
            <input
              type="time"
              id="appt"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              name="appt"
              step={1800}
              required
              className="p-1 input bg-secondary"
            />
          </div>
        </div>
        <div className="w-fit collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="font-bold collapse-title">{t("address")}</div>
          <div className="collapse-content">
            <textarea
              className="w-full h-auto input bg-secondary textarea textarea-bordered"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={50}
            />
            <div className="text-sm text-right text-gray-500">
              {address?.length}/{50}
            </div>
          </div>
        </div>
        <div className="w-fit collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="font-bold collapse-title">{t("Map link")}</div>
          <div className="collapse-content">
            <textarea
              className="w-full h-auto input bg-secondary textarea textarea-bordered"
              value={googleMapLink || ""}
              onChange={(e) => setGoogleMapLink(e.target.value)}
            />
            <div className="text-sm text-right text-gray-500"></div>
          </div>
        </div>
        <div className="w-fit collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="font-bold collapse-title">{t("FB link")}</div>
          <div className="collapse-content">
            <textarea
              className="w-full h-auto input bg-secondary textarea textarea-bordered"
              value={facebookLink || ""}
              onChange={(e) => setFacebookLink(e.target.value)}
            />
            <div className="text-sm text-right text-gray-500"></div>
          </div>
        </div>
        <div className="text-base bg-secondary w-fit rounded-xl collapse collapse-arrow">
          <input type="checkbox" />
          <span className="font-bold collapse-title">
            {t("storeCategories")}
          </span>
          <div className="space-y-2 collapse-content">
            {STORE_TYPES_FOR_SELECTOR.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`store-type-${option.value}`}
                  checked={selectedStoreTypes.includes(option.value)}
                  onChange={() => handleTypeCheckboxChange(option.value)}
                />
                <label htmlFor={`store-type-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="mt-4 uppercase btn btn-sm bg-primary text-secondary sm:w-fit"
        onClick={openModal}
      >
        {t("Update")}
      </button>
      <dialog
        id="confirm_modal"
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="border-2 modal-box bg-bg border-secondary/80"
        >
          <h3 className="text-lg font-bold text-primary">
            {t("Confirm Update")}
          </h3>
          <p className="py-4">{t("The following changes will be made:")}</p>
          {Object.keys(diffChanges).length > 0 ? (
            <div className="overflow-y-auto max-h-60">
              <table className="table w-full mb-2 overflow-x-auto">
                <thead>
                  <tr className="bg-secondary text-text">
                    <th className="px-4 py-2">{t("Field")}</th>
                    <th className="px-4 py-2">{t("Old Value")}</th>
                    <th className="px-4 py-2">{t("Changes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(diffChanges).map(([key, value]) => (
                    <tr className="bg-secondary" key={key}>
                      <td className="px-4 py-2 font-semibold">{t(key)}</td>
                      <td className="px-4 py-2 line-through text-rose-500">
                        {t(String(value.old))}
                      </td>
                      <td className="px-4 py-2 text-green-500">
                        {t(String(value.new))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <table className="table w-full mb-2 overflow-x-auto">
              <thead>
                <tr className="bg-secondary text-text">
                  <th className="px-4 py-2">{t("Field")}</th>
                  <th className="px-4 py-2">{t("Old Value")}</th>
                  <th className="px-4 py-2">{t("Changes")}</th>
                </tr>
              </thead>
              <tbody>
                <td colSpan={4} className="text-center bg-secondary text-text">
                  {t("No changes")}
                </td>
              </tbody>
            </table>
          )}
          <div className="modal-action">
            <button className="btn text-text bg-secondary" onClick={closeModal}>
              {t("Cancel")}
            </button>
            <button
              className={CUSTOM_BUTTON_CLASS}
              onClick={handleConfirmUpdate}
            >
              {t("Confirm")}
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default StoreStatus;
