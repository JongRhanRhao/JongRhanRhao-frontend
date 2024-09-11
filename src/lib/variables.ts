import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email({ message: "* Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "* Password must be at least 8 characters long" })
    .max(50, { message: "* Password must not exceed 50 characters" }),
  phone_number: z.string().min(10, { message: "* Invalid phone number" }),
});

export const SERVER_URL: string = "http://localhost:3000";
export const DATA_FETCHING_TIME_DELAY: number = 1000;

export const GLOBAL_URL_ROUTES = {
  landingPage: "/",
  reserveStatus: "/reservations",
  storeManagement: "/store-management",
  setting: "/settings",
  notFound: "*",
};

export const STORE_TYPES = {
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

export const STORE_TYPE_FOR_SELECTOR = [
  {
    value: STORE_TYPES.ALL,
    label: "All",
  },
  {
    value: STORE_TYPES.BAR,
    label: "Bar",
  },
  {
    value: STORE_TYPES.JAZZ,
    label: "Jazz",
  },
  {
    value: STORE_TYPES.COCKTAIL,
    label: "Cocktail",
  },
  {
    value: STORE_TYPES.PUB,
    label: "Pub",
  },
  {
    value: STORE_TYPES.CHILL,
    label: "Chill",
  },
  {
    value: STORE_TYPES.NINETIES,
    label: "90s",
  },
  {
    value: STORE_TYPES.DANCE,
    label: "Dance",
  },
  {
    value: STORE_TYPES.CLUB,
    label: "Club",
  },
];

export const STORE_STATUS = [
  {
    value: "Available",
    label: "Available",
  },
  {
    value: "Busy",
    label: "Busy",
  },
  {
    value: "Closed",
    label: "Closed",
  },
];

export const STORE_MANAGEMENT_MENU = {
  RESERVATIONS: "Reservations",
  STORE: "Store Management",
  STAFF: "Staff Management",
};
