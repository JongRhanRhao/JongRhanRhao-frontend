import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { SERVER_URL } from "@/lib/variables";

const BookingButton = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Retrieve user data from local storage or your state management solution
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (!userData.customerId || !userData.customerName) {
      alert("Please log in before making a reservation.");
      return;
    }

    if (!selectedDate || !numberOfPeople || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    const bookingData = {
      customerId: userData.customerId,
      reservationTime: selectedDate.toISOString(),
      numberOfPeople: numberOfPeople,
      customerName: userData.customerName,
      customerPhone: phoneNumber,
    };

    try {
      const response = await axios.post(
        `${SERVER_URL}/reservations`,
        bookingData
      );
      console.log("Booking response:", response.data);
      alert("Booking successful!");
      (document.getElementById("BookingButton") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error making your booking. Please try again.");
    }
  };
  // TODO: phone number feild validation
  return (
    <>
      <button
        className="btn w-48 bg-primary text-secondary font-bold py-2 px-4 rounded"
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
        <div className="modal-box bg-secondary text-text">
          <h2 className="font-bold text-xl mb-4">Book Your Reservation</h2>
          <div className="mb-4">
            <label className="font-bold mr-2">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="d MMMM yyyy"
              className="rounded p-2 mt-1 w-full bg-bg"
              minDate={new Date()}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Number of People:</label>
            <input
              type="number"
              value={numberOfPeople}
              min={1}
              onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
              className="rounded p-2 w-full mt-1 bg-bg"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold">Phone:</label>
            <input
              type="tel"
              value={phoneNumber}
              placeholder="081 234 5678"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded p-2 w-full mt-1 bg-bg"
            />
          </div>
          <p className="text-sm">Store will call you to confirm the booking.</p>
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
