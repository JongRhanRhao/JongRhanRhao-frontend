export const shopData: {
  [key: number]: {
    name: string;
    description: string;
    image: string;
    day: string;
    openTime: string;
    reserveExpired: string;
    maxSeats: number;
    currSeats: number;
    rating: number;
  };
} = {
  1: {
    name: "Warmup",
    description: "This is a popular club where you can have fun.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-03-1024x1024.jpg",
    day: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 25,
    rating: 5,
  },
  2: {
    name: "Thachang",
    description: "This is another popular club where you can have fun.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-02-1024x1024.jpg",
    day: "EVERYDAY",
    openTime: "19:00 - 03:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 15,
    rating: 4,
  },
  3: {
    name: "Too Nice Nimman",
    description: "This is a trendy club with a great atmosphere.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-05-1024x1024.jpg",
    day: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 3,
  },
  4: {
    name: "Lonely Heart Cafe",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-16-1024x1024.jpg",
    day: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
  },
};

export const ShopCards = Object.keys(shopData).map((key) => {
  const shop = shopData[parseInt(key)];
  const reservationStatus =
    shop.currSeats < shop.maxSeats ? "can reserve" : "can't reserve";

  return {
    id: parseInt(key),
    image: shop.image,
    title: shop.name,
    reservationStatus,
    rating: shop.rating,
    currSeats: shop.currSeats,
    maxSeats: shop.maxSeats,
    description: shop.description,
  };
});
