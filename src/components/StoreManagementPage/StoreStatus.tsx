import { useState } from "react";
import axios from "axios";
import { socket } from "@/socket";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { Store } from "@/hooks/useFetchStores";
import {
  SERVER_URL,
  STORE_MGMT_STATUS,
  STORE_TYPES_FOR_SELECTOR,
} from "@/lib/variables";
import { FilterButton } from "@/components/shared/FilterButton";

const StoreStatus = ({ store }: { store: Store | null }) => {
  const splitOldTime = store?.open_timebooking.split(" - ");
  const storeId = store?.store_id;
  const [status, setStatus] = useState(store?.status);
  const [selectedStoreTypes, setSelectedStoreTypes] = useState<string[]>(
    store?.type || []
  );
  const [currSeat, setCurrSeat] = useState(store?.curr_seats);
  const [maxSeat, setMaxSeat] = useState(store?.max_seats);
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
  const { t } = useTranslation();
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
        maxSeats: maxSeat || store.max_seats,
        currSeats: currSeat || store.curr_seats,
        isPopular: store.is_popular,
        type: selectedStoreTypes || store.type,
        description: description || store.description,
        imageUrl: store.image_url,
        rating: store.rating,
        googleMapLink: googleMapLink || store.google_map_link,
        facebookLink: facebookLink || store.facebook_link,
        // defaultSlots: store.default_slots,
      });
      socket.emit("store_update", { storeId });
    } catch (error) {
      console.error("Error updating store:", error);
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

  const updateStoreStatus = () => {
    toast.promise(handleStatusChange(), {
      loading: "Updating store...",
      success: "Store updated successfully!",
      error: "Error updating, please try again.",
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
        <div className="p-3 bg-secondary w-fit rounded-xl">
          <span className="font-bold">
            {t("seatSlots")}: <br />
          </span>
          <input
            type="number"
            min={0}
            value={currSeat}
            className="w-20 input bg-secondary"
            onChange={(e) => setCurrSeat(parseInt(e.target.value))}
            max={maxSeat}
          />
          <span className="m-2 text-center">/</span>
          <input
            type="number"
            value={maxSeat}
            min={0}
            className="w-20 input bg-secondary"
            onChange={(e) => setMaxSeat(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="font-bold collapse-title">
            {t("storeDescription")}:
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
            {t("openingHours")}:
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
          <div className="font-bold collapse-title">{t("address")}:</div>
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
          <div className="font-bold collapse-title">{t("Map link")}:</div>
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
          <div className="font-bold collapse-title">{t("FB link")}:</div>
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
            {t("storeCategories")}:
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
        onClick={updateStoreStatus}
      >
        {t("Update")}
      </button>
    </div>
  );
};

export default StoreStatus;
