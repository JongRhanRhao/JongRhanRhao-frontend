import StoreCard from "@/components/shared/StoreCard";
import Slider from "react-slick";

const PopularStoreList = () => {
  // TODO: Replace cards array this with DB
  const cards = [
    {
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
      image:
        "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-02-1024x1024.jpg",
      title: "Thachang",
      reservationStatus: "can reserve",
      rating: 4,
      currSeats: 15,
      maxSeats: 30,
      description: "This is a popular club where you can have fun.",
    },
    {
      image:
        "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-05-1024x1024.jpg",
      title: "Too Nice Nimman",
      reservationStatus: "can't reserve",
      rating: 3,
      currSeats: 30,
      maxSeats: 30,
      description: "This is a popular club where you can have fun.",
    },
    {
      image:
        "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-16-1024x1024.jpg",
      title: "Lonely Heart Cafe",
      reservationStatus: "can't reserve",
      rating: 5,
      currSeats: 30,
      maxSeats: 30,
      description: "This is a popular club where you can have fun.",
    },
    {
      image:
        "https://northspace.life/wp-content/uploads/2024/01/hanguotcnx2024-04-1024x1024.jpg",
      title: "MYST MAYA",
      reservationStatus: "can't reserve",
      rating: 5,
      currSeats: 30,
      maxSeats: 30,
      description: "This is a popular club where you can have fun.",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-primary">Popular</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary hover:underline cursor-pointer">
            View all
          </span>
        </div>
      </div>
      <div className="flex items-center">
        {cards.map((card, index) => (
          <div key={index}>
            <StoreCard
              image={card.image}
              title={card.title}
              reservationStatus={card.reservationStatus}
              rating={card.rating}
              currSeats={card.currSeats}
              maxSeats={card.maxSeats}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularStoreList;
