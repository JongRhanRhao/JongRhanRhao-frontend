import { useState, useEffect, useMemo, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";

import ShopCard from "@/components/shared/ShopCard";
import { ShopCards } from "@/SampleData/data";

const LOADING_TIMEOUT = 500;

const MemoizedShopCard = memo(ShopCard);

const StoreListWithFilterFeature = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [isTypeLoading, setIsTypeLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timer);
  }, []);

  const filteredShopCards = useMemo(() => {
    if (selectedType === "All") {
      return ShopCards;
    }
    return ShopCards.filter((card) => card.type === selectedType);
  }, [selectedType]);

  const handleTypeClick = (type: string) => {
    setIsTypeLoading(true);
    setSelectedType(type);
    setTimeout(() => {
      setIsTypeLoading(false);
    }, LOADING_TIMEOUT);
  };

  const shopCardsList = useMemo(
    () =>
      filteredShopCards.map(
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
    [filteredShopCards]
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold text-secondary mb-5">
          Discover & Booking
        </h2>
        <div className="flex justify-center items-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  // TODO: Implement favorite feature to check if the shop is favorite
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-secondary mb-5">
        Discover & Booking
      </h2>
      <div className="mb-4 space-x-2">
        <button
          className={`btn btn-sm ${
            selectedType === "Favorite" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("Favorite")}
        >
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
        </button>
        <button
          className={`btn btn-sm ${
            selectedType === "Hot" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("Hot")}
        >
          <FontAwesomeIcon icon={faFire} className="text-error" />
        </button>
        <button
          className={`btn btn-sm ${
            selectedType === "All" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("All")}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${
            selectedType === "Cafe" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("Cafe")}
        >
          Cafe
        </button>
        <button
          className={`btn btn-sm ${
            selectedType === "90s" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("90s")}
        >
          90s
        </button>
      </div>
      {!isTypeLoading ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shopCardsList}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default memo(StoreListWithFilterFeature);
