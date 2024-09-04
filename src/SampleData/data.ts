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
    status: string;
    openTime: string;
    reserveExpired: string;
    maxSeats: number;
    currSeats: number;
    rating: number;
    address?: string;
    type: string;
    comment: Comment[];
  };
} = {
  1: {
    name: "Warm up Cafe",
    description:
      "ร้านท่ามใจกลางเมืองนิมมาน ใครไม่รู้จักร้านนี้คงพลาด มีแต่คนเข้าร้าน เหมาะกับวัยรุ่นยุค 90s ที่ชอบฟังเพลงเก่าๆ และเพลงลูกทุ่ง ",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-03-1024x1024.jpg",
    status: "Busy",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 25,
    rating: 5,
    type: "Cafe",
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
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
    status: "EVERYDAY",
    openTime: "19:00 - 03:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 15,
    rating: 4,
    type: "club",
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
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
      {
        name: "น้องแองเจิ้ล",
        avatar: "https://randomuser.me/api/portraits/thumb/women/76.jpg",
        comment: "ที่จอดรถเยอะ ไปสะดวก",
        date: "5 hours ago",
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
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 3,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  4: {
    name: "Lonely Heart Cafe",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-16-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    comment: [],
  },
  5: {
    name: "TAWANDANG",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-19-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  6: {
    name: "Zoe In Yellow",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-12-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  7: {
    name: "LVMC",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-06-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  8: {
    name: "Space Time",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/06/hangout-spacetime-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  9: {
    name: "Botan Bar",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-24new-1024x1024.png",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  10: {
    name: "Tora",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/08/hangout-tora-1024x1024.png",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  11: {
    name: "Shellby Bar",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-15-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
    comment: [],
  },
  12: {
    name: "What a small CNX",
    description: "This is a cozy cafe with a romantic ambiance.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-09-1024x1024.jpg",
    status: "EVERYDAY",
    openTime: "19:00 - 02:00",
    reserveExpired: "20:00",
    maxSeats: 30,
    currSeats: 30,
    rating: 5,
    address:
      "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai, Chang Wat Chiang Mai 50200",
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
    type: shop.type,
  };
});
