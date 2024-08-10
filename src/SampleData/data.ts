export const shopData: {
  [key: number]: { name: string; description: string };
} = {
  1: {
    name: "Warmup",
    description: "This is a popular club where you can have fun.",
  },
  2: {
    name: "Thachang",
    description: "This is another popular club where you can have fun.",
  },
  3: {
    name: "Too Nice Nimman",
    description: "This is a trendy club with a great atmosphere.",
  },
  4: {
    name: "Lonely Heart Cafe",
    description: "This is a cozy cafe with a romantic ambiance.",
  },
};

export const ShopCards = [
  {
    id: 1,
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-03-1024x1024.jpg",
    title: "Warmup",
    reservationStatus: "can reserve",
    rating: 5,
    currSeats: 25,
    maxSeats: 30,
    description: "This is a popular club where you can have fun.",
  },
  {
    id: 2,
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-02-1024x1024.jpg",
    title: "Thachang",
    reservationStatus: "can reserve",
    rating: 4,
    currSeats: 15,
    maxSeats: 30,
    description: "This is another popular club where you can have fun.",
  },
  {
    id: 3,
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-05-1024x1024.jpg",
    title: "Too Nice Nimman",
    reservationStatus: "can't reserve",
    rating: 3,
    currSeats: 30,
    maxSeats: 30,
    description: "This is a trendy club with a great atmosphere.",
  },
  {
    id: 4,
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-16-1024x1024.jpg",
    title: "Lonely Heart Cafe",
    reservationStatus: "can't reserve",
    rating: 5,
    currSeats: 30,
    maxSeats: 30,
    description: "This is a cozy cafe with a romantic ambiance.",
  },
];
