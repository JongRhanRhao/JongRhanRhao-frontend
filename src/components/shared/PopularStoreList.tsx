import StoreCard from "@/components/shared/StoreCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularStoreList = () => {
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
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="px-1">
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
      </Slider>
    </div>
  );
};

export default PopularStoreList;
