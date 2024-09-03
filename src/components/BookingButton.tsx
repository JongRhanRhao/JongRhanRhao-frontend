import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const BookingButton = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [timeRange, setTimeRange] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const peopleOptions = [
    { value: 1, label: "1 Person" },
    { value: 2, label: "2 People" },
    { value: 3, label: "3 People" },
    { value: 4, label: "4 People" },
  ];

  const timeOptions = [
    { value: "morning", label: "Morning (8 AM - 12 PM)" },
    { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
    { value: "evening", label: "Evening (4 PM - 8 PM)" },
    { value: "night", label: "Night (8 PM - 12 AM)" },
  ];

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Date:", selectedDate);
    console.log("Number of People:", numberOfPeople);
    console.log("Time Range:", timeRange);
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
      <dialog id="BookingButton" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="font-bold text-xl mb-4">Book Your Reservation</h2>

          <div className="mb-4">
            <label className="font-bold text-gray-500">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="rounded p-2 w-full mt-1"
              minDate={new Date()}
            />
          </div>

          <div className="mb-4">
            <label className="font-bold text-gray-500">Number of People:</label>
            <Select
              options={peopleOptions}
              value={numberOfPeople}
              onChange={(option) => setNumberOfPeople(option)}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="font-bold text-gray-500">Time Range:</label>
            <Select
              options={timeOptions}
              value={timeRange}
              onChange={(option) => setTimeRange(option)}
              className="mt-1"
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
