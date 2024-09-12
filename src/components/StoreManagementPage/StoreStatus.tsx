import { useState } from "react";
import Select from "react-select";
import axios from "axios";

import { Store } from "@/hooks/useFetchStores";
import {
  SERVER_URL,
  STORE_STATUS,
  STORE_TYPE_FOR_SELECTOR,
} from "@/lib/variables";
import { FilterButton } from "../shared/FilterButton";
import toast from "react-hot-toast";

const StoreStatus = ({ store }: { store: Store | null }) => {
  const splitOldTime = store?.open_timebooking.split(" - ");
  const storeId = store?.store_id;
  const [status, setStatus] = useState(store?.status);
  const [storeType, setStoreType] = useState(store?.type);
  const [currSeat, setCurrSeat] = useState(store?.curr_seats);
  const [maxSeat, setMaxSeat] = useState(store?.max_seats);
  const [openingTime, setOpeningTime] = useState(
    splitOldTime ? splitOldTime[0] || "" : ""
  );
  const [description, setDescription] = useState(store?.description);
  const [closingTime, setClosingTime] = useState(
    splitOldTime ? splitOldTime[1] || "" : ""
  );
  const descriptionMaxLength = 500;

  if (!store) {
    return <p>No store selected.</p>;
  }

  const handleStatusChange = async () => {
    try {
      await axios.put(`${SERVER_URL}/stores/api/stores/${storeId}`, {
        shopName: store.shop_name,
        openTimeBooking: newOpeningTime,
        cancelReserve: store.cancel_reserve,
        ownerId: store.owner_id,
        staffId: store.staff_id,
        address: store.address,
        status: status || store.status,
        maxSeats: maxSeat || store.max_seats,
        currSeats: currSeat || store.curr_seats,
        isPopular: store.is_popular,
        type: storeType || store.type,
        description: description || store.description,
        imageUrl: store.image_url,
        rating: store.rating,
      });
    } catch (error) {
      console.error("Error updating store:", error);
      throw error;
    }
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
    <div className="container flex flex-col text-text">
      <div className="space-y-3">
        <div className="text-base">Store Status:</div>
        {STORE_STATUS.map((option) => (
          <FilterButton
            key={option.value}
            title={option.label}
            selectedTitle={status}
            onClick={() => setStatus(option.value)}
            className="flex-grow ml-1 border sm:flex-grow-0 border-primary"
          />
        ))}
        <div className="w-full collapse collapse-arrow bg-secondary">
          <input type="checkbox" />
          <div className="collapse-title">Description:</div>
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
          <div className="collapse-title">Seat slots:</div>
          <div className="collapse-content">
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
        </div>
        <div className="collapse collapse-arrow bg-secondary w-fit">
          <input type="checkbox" />
          <div className="text-base collapse-title">Opening Hours:</div>
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
      </div>
      <div className="mt-1 text-base">Store Type:</div>
      <Select
        options={STORE_TYPE_FOR_SELECTOR}
        className="mt-1 text-secondary w-fit"
        value={STORE_TYPE_FOR_SELECTOR.find(
          (option) => option.value === storeType
        )}
        onChange={(selectedOption) =>
          setStoreType(selectedOption?.value?.toString() || "")
        }
      />
      <button
        className="mt-4 uppercase btn btn-sm bg-primary text-secondary sm:w-fit"
        onClick={updateStoreStatus}
      >
        Update
      </button>
    </div>
  );
};

export default StoreStatus;
