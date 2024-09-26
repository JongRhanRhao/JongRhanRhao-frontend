import i18n from "@/helper/i18n";
import DatePicker from "react-datepicker";
import { th } from "date-fns/locale";

const BookingCalendar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="d MMMM yyyy"
        className="p-2 mt-1 rounded-xl bg-secondary"
        minDate={new Date()}
        maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
        locale={i18n.language == "th" ? th : ""}
      />
    </>
  );
};

export default BookingCalendar;
