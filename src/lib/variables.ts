export const SERVER_URL: string = "http://localhost:3000";

export const DATA_FETCHING_DELAY_TIME: number = 0;

export const ERROR_TEXT: string =
  "Something went wrong, please try again later.";

export const CUSTOM_BUTTON_CLASS =
  "btn bg-primary text-secondary hover:text-primary hover:bg-secondary";
export const CUSTIOM_BUTTON_OUTLINE_CLASS =
  "btn btn-outline text-primary hover:bg-primary hover:text-secondary hover:border-none";

export const GLOBAL_URL_ROUTES = {
  landingPage: "/",
  reserveStatus: "/reservations",
  storeManagement: "/store-management",
  setting: "/profile",
  notFound: "*",
};

export const STORE_AVAILABILITY_STATUS = {
  AVAILABLE: "Can walk-in",
  UNAVAILABLE: "Unavailable",
  BUSY: "Busy",
  CLOSE: "Closed",
};

export const RESERVATION_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
};

export const RESERVATION_STATUS_FOR_SELECTOR = [
  {
    value: RESERVATION_STATUS.PENDING,
    label: RESERVATION_STATUS.PENDING,
  },
  {
    value: RESERVATION_STATUS.CONFIRMED,
    label: RESERVATION_STATUS.CONFIRMED,
  },
  {
    value: RESERVATION_STATUS.CANCELLED,
    label: RESERVATION_STATUS.CANCELLED,
  },
];

export const STORE_TYPES_FOR_FILTER_BTN = {
  HOT: "Hot",
  FAVORITE: "Favorite",
  FORYOU: "For you",
  ALL: "All",
  BAR: "Bar",
  JAZZ: "Jazz",
  COCKTAIL: "Cocktail",
  PUB: "Pub",
  CHILL: "Chill",
  NINETIES: "90s",
  DANCE: "Dance",
  CLUB: "Club",
  MIDNIGHT: "Midnight",
  "4AM": "4AM",
  NIMMAN: "Nimman",
};

export const STORE_TYPES_FOR_SELECTOR = [
  {
    value: STORE_TYPES_FOR_FILTER_BTN.BAR,
    label: STORE_TYPES_FOR_FILTER_BTN.BAR,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.JAZZ,
    label: STORE_TYPES_FOR_FILTER_BTN.JAZZ,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.COCKTAIL,
    label: STORE_TYPES_FOR_FILTER_BTN.COCKTAIL,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.PUB,
    label: STORE_TYPES_FOR_FILTER_BTN.PUB,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.CHILL,
    label: STORE_TYPES_FOR_FILTER_BTN.CHILL,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.NINETIES,
    label: STORE_TYPES_FOR_FILTER_BTN.NINETIES,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.DANCE,
    label: STORE_TYPES_FOR_FILTER_BTN.DANCE,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.CLUB,
    label: STORE_TYPES_FOR_FILTER_BTN.CLUB,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.MIDNIGHT,
    label: STORE_TYPES_FOR_FILTER_BTN.MIDNIGHT,
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN["4AM"],
    label: STORE_TYPES_FOR_FILTER_BTN["4AM"],
  },
  {
    value: STORE_TYPES_FOR_FILTER_BTN.NIMMAN,
    label: STORE_TYPES_FOR_FILTER_BTN.NIMMAN,
  },
];

export const STORE_MGMT_STATUS = [
  {
    value: "Available",
    label: "Available",
    className: "border-green-500",
    selectedClassName: "bg-green-500",
  },
  {
    value: "Busy",
    label: "Busy",
    className: "border-yellow-500",
    selectedClassName: "bg-yellow-500",
  },
  {
    value: "Closed",
    label: "Closed",
    className: "border-rose-500",
    selectedClassName: "bg-rose-500 text-text",
  },
];

export const STORE_MGMT_MENU = {
  RESERVATIONS: "Reservations",
  STORE: "Store Management",
  STAFF: "Staff Management",
};
