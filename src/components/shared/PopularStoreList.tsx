import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const PopularStoreList = () => {
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {ShopCards.map((card) => (
          <ShopCard
            key={card.id}
            id={card.id}
            image={card.image}
            title={card.title}
            reservationStatus={card.reservationStatus}
            rating={card.rating}
            currSeats={card.currSeats}
            maxSeats={card.maxSeats}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularStoreList;
