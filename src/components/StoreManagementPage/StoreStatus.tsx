import { STORE_STATUS } from "@/lib/variables";
import Select from "react-select";

const StoreStatus = () => {
  return (
    <div className="space-y-2 space-x-2 text-text font-bold">
      <div className="text-base">Store Status:</div>
      <Select options={STORE_STATUS} className="text-secondary w-fit" />
      <button className="btn btn-sm uppercase">Update</button>
      <div className="text-base">Opening Hours:</div>
      <input
        type="time"
        id="appt"
        name="appt"
        step={1800}
        className="p-1"
        required
      />
      <span className="text-center">to</span>
      <input
        type="time"
        id="appt"
        name="appt"
        step={1800}
        required
        className="p-1"
      />
      <button className="btn btn-sm uppercase">Update</button>
    </div>
  );
};

export default StoreStatus;
