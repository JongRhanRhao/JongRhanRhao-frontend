import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingButton = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<{
    value: number;
  } | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<{
    value: number;
  } | null>(null);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Date:", selectedDate);
    console.log("Number of People:", numberOfPeople);
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <>
      <button
        className="btn w-48 bg-primary text-white font-bold py-2 px-4 rounded"
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
        <div className="modal-box">
          <h2 className="font-bold text-xl mb-4">Book Your Reservation</h2>
          <div className="mb-4">
            <label className="font-bold mr-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="rounded p-2 w-full mt-1"
              minDate={new Date()}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Number of People:</label>
            <input
              type="number"
              value={numberOfPeople ? numberOfPeople.value.toString() : ""}
              min={1}
              onChange={(e) =>
                setNumberOfPeople({ value: parseInt(e.target.value) })
              }
              className="rounded p-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Phone:</label>
            <input
              type="tel"
              value={phoneNumber ? phoneNumber.value.toString() : ""}
              maxLength={10}
              placeholder="081 234 5678"
              onChange={(e) =>
                setPhoneNumber({ value: e.target.value as unknown as number })
              }
              className="rounded p-2 w-full mt-1"
            />
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex justify-end w-full space-x-2">
              <button className="btn">Close</button>
              <button
                onClick={handleSubmit}
                className="btn bg-primary text-white font-bold py-2 px-4 rounded mr-2"
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
