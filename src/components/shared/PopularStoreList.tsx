import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const PopularStoreList = () => {
  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-primary mb-5">Popular</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
