import { useState, useMemo, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";

import ShopCard from "@/components/shared/ShopCard";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { useFetchStores } from "@/hooks/useFetchStores";
import { Link } from "react-router-dom";

const MemoizedShopCard = memo(ShopCard);

const StoreListWithFilterFeature = () => {
  const [selectedType, setSelectedType] = useState("All");

  const { data: stores, isLoading, error } = useFetchStores();

  const filteredShopCards = useMemo(() => {
    if (!stores) return [];

    if (selectedType === "All") {
      return stores;
    }
    if (selectedType === "Hot") {
      return stores.filter((store) => store.is_popular);
    }
    if (selectedType === "Favorite") {
      return stores.filter((store) => store.is_favorite);
    }
    return stores.filter((store) => store.type === selectedType);
  }, [selectedType, stores]);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const shopCardsList = useMemo(
    () =>
      filteredShopCards.map((store) => {
        const storeId = store.store_id;
        return (
          <Link key={storeId} to={`/shop/${storeId}`} className="no-underline">
            <MemoizedShopCard
              id={storeId}
              image={store.image_url || ""}
              title={store.shop_name}
              reservationStatus={
                store.curr_seats < store.max_seats
                  ? "can reserve"
                  : "cannot reserve"
              }
              rating={store.rating}
              maxSeats={store.max_seats}
              currSeats={store.curr_seats}
              isFavorite={store.is_favorite}
              description={store.description || ""}
              onClick={() => {}}
            />
          </Link>
        );
      }),
    [filteredShopCards]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-2xl flex justify-center items-center h-full flex-col">
        Something went wrong, please try again later.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-secondary mb-5">
        Discover & Booking
      </h2>
      <div className="mb-4 space-x-2">
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
            selectedType === "Favorite" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleTypeClick("Favorite")}
        >
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {shopCardsList}
      </div>
    </div>
  );
};

export default memo(StoreListWithFilterFeature);
