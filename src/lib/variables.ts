export const SERVER_URL: string = "http://localhost:3000";

export const DATA_FETCHING_DELAY_TIME: number = 444;

export const ERROR_TEXT: string =
  "Something went wrong, please try again later.";

export const GLOBAL_URL_ROUTES = {
  landingPage: "/",
  reserveStatus: "/reservations",
  storeManagement: "/store-management",
  setting: "/settings",
  notFound: "*",
};

export const STORE_AVAILABILITY_STATUS = {
  AVAILABLE: "Reservable",
  UNAVAILABLE: "Unavailable",
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
