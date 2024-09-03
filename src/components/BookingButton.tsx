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

  const handleSubmit = () => {
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
        <div className="modal-box ">
          <div>
            <h2 className="font-bold text-xl mb-4">Book Your Reservation</h2>

            <div className="mb-4">
              <label className="font-bold text-gray-500">Select Date:</label>
              &nbsp;
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="rounded p-2 w-full"
                minDate={new Date()} // Prevent booking in the past
              />
            </div>

            <div className="mb-4">
              <label className="font-bold text-gray-500">
                Number of People:
              </label>
              <Select
                options={peopleOptions}
                value={numberOfPeople}
                onChange={(option) => setNumberOfPeople(option)}
                className="rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="font-bold text-gray-500">Time Range:</label>
              <Select
                options={timeOptions}
                value={timeRange}
                onChange={(option) => setTimeRange(option)}
                className="rounded p-2 w-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-primary font-bold py-2 px-4 rounded ml-2"
            >
              Book Now
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default BookingButton;
