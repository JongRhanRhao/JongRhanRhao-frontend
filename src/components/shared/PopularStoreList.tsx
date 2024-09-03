import { useState, useEffect, useMemo, memo } from "react";
import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const LOADING_TIMEOUT = 500;

const MemoizedShopCard = memo(ShopCard);

const PopularStoreList = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  const shopCardsList = useMemo(
    () =>
      ShopCards.map(
        ({
          id,
          image,
          title,
          reservationStatus,
          rating,
          currSeats,
          maxSeats,
          description,
        }) => (
          <MemoizedShopCard
            key={id}
            id={id}
            image={image}
            title={title}
            reservationStatus={reservationStatus}
            rating={rating}
            currSeats={currSeats}
            maxSeats={maxSeats}
            description={description}
          />
        )
      ),
    []
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-4xl font-bold text-secondary mb-5">Popular</h2>
        <div className="flex justify-center items-center">
          <span className="loading loading-ring loading-lg text-secondary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold text-secondary mb-5">Popular</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopCardsList}
      </div>
    </div>
  );
};

export default memo(PopularStoreList);
