import DatePicker from "react-datepicker";
import { th } from "date-fns/locale";

import i18n from "@/helper/i18n";

interface BookingCalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  storeId: string;
}

const BookingCalendar = ({
  selectedDate,
  setSelectedDate,
}: BookingCalendarProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="d MMMM yyyy"
      minDate={new Date()}
      locale={i18n.language === "th" ? th : undefined}
      maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
      className="p-2 rounded-xl"
    />
  );
};

export default BookingCalendar;
