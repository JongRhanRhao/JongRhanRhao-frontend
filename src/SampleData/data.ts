interface Comment {
  name: string;
  avatar: string;
  comment: string;
  date: string;
  likes: number;
  replies: number;
}
interface Staff {
  staffId: string;
  name: string;
  position: string;
  contactNumber: string;
}

interface Reservation {
  reservationId: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  partySize: number;
  status: string;
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
    address: string;
    type?: string;
    isFavorite?: boolean;
    isPopular?: boolean;
    comment: Comment[];
    staff?: Staff[];
    reservations?: Reservation[];
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
    type: "90s",
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
    address: "Nimmanhaemin Rd, Tambon Su Thep, Amphoe Mueang Chiang Mai",
    comment: [],
    type: "Cafe",
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
    type: "90s",
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
    type: "90s",
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
    type: "90s",
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
    type: "90s",
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
    type: "Cafe",
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
    type: "90s",
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
    type: "Cafe",
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
    type: "90s",
  },
  "17": {
    name: "Lanna Nights",
    description:
      "Experience traditional Lanna culture with a modern twist in our vibrant venue.",
    image: "https://example.com/images/lanna-nights.jpg",
    status: "OPEN",
    openTime: "18:00 - 00:00",
    reserveExpired: "20:00",
    maxSeats: 80,
    currSeats: 45,
    rating: 4.7,
    address:
      "123 Tha Pae Rd, Chang Klan, Mueang Chiang Mai District, Chiang Mai 50100",
    type: "Cultural Bar",
    isFavorite: true,
    isPopular: true,
    comment: [
      {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
        comment:
          "Fantastic blend of traditional and modern. The live music was exceptional!",
        date: "2 days ago",
        likes: 12,
        replies: 3,
      },
    ],
    staff: [
      {
        staffId: "s101",
        name: "Somchai Jaidee",
        position: "Manager",
        contactNumber: "+66812345678",
      },
      {
        staffId: "s102",
        name: "Nok Suwannee",
        position: "Bartender",
        contactNumber: "+66823456789",
      },
    ],
    reservations: [
      {
        reservationId: "r1001",
        customerId: "c501",
        customerName: "Emma Wilson",
        date: "2024-09-15",
        time: "19:30",
        partySize: 4,
        status: "confirmed",
      },
      {
        reservationId: "r1002",
        customerId: "c502",
        customerName: "Alex Johnson",
        date: "2024-09-16",
        time: "20:00",
        partySize: 2,
        status: "pending",
      },
    ],
  },
  "18": {
    name: "Zen Garden Lounge",
    description:
      "A serene escape in the heart of the city with Japanese-inspired decor and cocktails.",
    image:
      "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-20-1024x1024.jpg",
    status: "BUSY",
    openTime: "17:00 - 01:00",
    reserveExpired: "21:00",
    maxSeats: 50,
    currSeats: 48,
    rating: 4.9,
    address:
      "456 Nimmanhaemin Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
    type: "Lounge",
    isFavorite: true,
    isPopular: true,
    comment: [
      {
        name: "Lisa Chen",
        avatar: "https://randomuser.me/api/portraits/thumb/women/22.jpg",
        comment:
          "Absolutely stunning ambiance. The sake cocktails are a must-try!",
        date: "1 week ago",
        likes: 25,
        replies: 5,
      },
    ],
    staff: [
      {
        staffId: "s201",
        name: "Hiroshi Tanaka",
        position: "Head Bartender",
        contactNumber: "+66834567890",
      },
      {
        staffId: "s202",
        name: "Mint Srisuk",
        position: "Host",
        contactNumber: "+66845678901",
      },
    ],
    reservations: [
      {
        reservationId: "r2001",
        customerId: "c601",
        customerName: "Michael Chang",
        date: "2024-09-20",
        time: "18:30",
        partySize: 6,
        status: "confirmed",
      },
      {
        reservationId: "r2002",
        customerId: "c602",
        customerName: "Sarah O'Connor",
        date: "2024-09-21",
        time: "20:00",
        partySize: 2,
        status: "waitlist",
      },
    ],
  },
  "19": {
    name: "Neon Nights",
    description:
      "A high-energy club with state-of-the-art sound and lighting systems.",
    image: "https://example.com/images/neon-nights.jpg",
    status: "EVERYDAY",
    openTime: "22:00 - 04:00",
    reserveExpired: "23:00",
    maxSeats: 200,
    currSeats: 150,
    rating: 4.5,
    address:
      "789 Chang Klan Rd, Chang Klan, Mueang Chiang Mai District, Chiang Mai 50100",
    type: "Nightclub",
    isFavorite: false,
    isPopular: true,
    comment: [
      {
        name: "Tom Wilson",
        avatar: "https://randomuser.me/api/portraits/thumb/men/85.jpg",
        comment: "Insane energy! The DJ sets are always on point.",
        date: "3 days ago",
        likes: 30,
        replies: 8,
      },
    ],
    staff: [
      {
        staffId: "s301",
        name: "DJ Spark",
        position: "Resident DJ",
        contactNumber: "+66856789012",
      },
      {
        staffId: "s302",
        name: "Aom Wongsa",
        position: "VIP Host",
        contactNumber: "+66867890123",
      },
    ],
    reservations: [
      {
        reservationId: "r3001",
        customerId: "c701",
        customerName: "James Rodriguez",
        date: "2024-09-22",
        time: "23:00",
        partySize: 8,
        status: "confirmed",
      },
      {
        reservationId: "r3002",
        customerId: "c702",
        customerName: "Emily Nakamura",
        date: "2024-09-23",
        time: "00:30",
        partySize: 4,
        status: "pending",
      },
    ],
  },
};

export const ShopSamepleData = Object.keys(shopData).map((key) => {
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
