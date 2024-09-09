import { z } from "zod";

export type FormData = {
  user_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
};

export const UserSchema = z.object({
  email: z.string().email({ message: "* Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "* Password must be at least 8 characters long" })
    .max(50, { message: "* Password must not exceed 50 characters" }),
  phone_number: z.string().min(10, { message: "* Invalid phone number" }),
});

export const SERVER_URL: string = "http://localhost:3000";

export const GLOBAL_URL_ROUTES = {
  landingPage: "/",
  message: "/message",
  reserveStatus: "/ReserveStatus",
  storeManagement: "/StoreManagement",
  setting: "/setting",
  notFound: "*",
};

export type Reservations = {
  shop_name: string;
  reservation_id: string;
  shop_id: string;
  customerId: string;
  reservation_date: string;
  reservation_time: string;
  reservationStatus: string;
  reservation_status: string;
};

export const FILTER_TYPES = {
  HOT: "Hot",
  FAVORITE: "Favorite",
  ALL: "All",
  BAR: "Bar",
  JAZZ: "Jazz",
  COCKTAIL: "Cocktail",
  PUB: "Pub",
  CHILL: "Chill",
  NINETIES: "90s",
  DANCE: "Dance",
  CLUB: "Club",
};

export const STORE_STATUS = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Closed",
    label: "Closed",
  },
  {
    value: "Busy",
    label: "Busy",
  },
];

export const STORE_MANAGEMENT_MENU = {
  RESERVATIONS: "RESERVATIONS",
  STORE: "Store Management",
  STAFF: "Staff Management",
};
