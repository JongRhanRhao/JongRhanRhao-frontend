interface Comment {
  name: string;
  avatar: string;
  comment: string;
  date: string;
  likes: number;
  replies: number;
}

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
    comment: Comment[];
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
    comment: [
      {
        name: "สมชาย ใจดี",
        avatar: "https://randomuser.me/api/portraits/thumb/men/76.jpg",
        comment: "อาหารอร่อย พนักงานน่ารัก",
        date: "2 hours ago",
        likes: 5,
        replies: 2,
      },
      {
        name: "สมหญิง ใจเย็น",
        avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
        comment: "ที่จอดรถเยอะ ไปสะดวก",
        date: "2 hours ago",
        likes: 5,
        replies: 2,
      },
    ],
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
    comment: [
      {
        name: "น้องโบนัส",
        avatar: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
        comment: "ลูกค้าน่ารัก พนักงานยิ้มหวานมาก",
        date: "2 hours ago",
        likes: 5,
        replies: 2,
      },
      {
        name: "น้องแองเจิ้ล",
        avatar: "https://randomuser.me/api/portraits/thumb/women/76.jpg",
        comment: "ที่จอดรถเยอะ ไปสะดวก",
        date: "5 hours ago",
        likes: 5,
        replies: 2,
      },
    ],
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
    comment: [],
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
    comment: [],
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
