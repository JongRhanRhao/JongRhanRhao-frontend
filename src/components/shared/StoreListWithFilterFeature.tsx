import React, { useState, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import ShopCard from "@/components/shared/ShopCard";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { Store, useFetchStores } from "@/hooks/useFetchStores";

const FILTER_TYPES = {
  ALL: "All",
  HOT: "Hot",
  FAVORITE: "Favorite",
  CAFE: "Cafe",
  NINETIES: "90s",
};

type FilterButtonProps = {
  type: string;
  selectedType: string;
  onClick: (type: string) => void;
  icon?: IconDefinition;
};

const FilterButton = React.memo(
  ({ type, selectedType, onClick, icon }: FilterButtonProps) => (
    <button
      className={`btn btn-sm ${
        selectedType === type ? "btn-primary" : "btn-outline"
      }`}
      onClick={() => onClick(type)}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className={icon === faFire ? "text-error" : "text-yellow-400"}
        />
      ) : (
        type
      )}
    </button>
  )
);

const ShopCardLink = React.memo(({ store }: { store: Store }) => (
  <Link to={`/shop/${store.store_id}`} className="no-underline">
    <ShopCard
      id={store.store_id}
      image={store.image_url || ""}
      title={store.shop_name}
      reservationStatus={
        store.curr_seats < store.max_seats ? "can reserve" : "cannot reserve"
      }
      rating={store.rating}
      maxSeats={store.max_seats}
      currSeats={store.curr_seats}
      isFavorite={store.is_favorite}
      description={store.description || ""}
      onClick={() => {}}
    />
  </Link>
));

const StoreListWithFilterFeature = () => {
  const [selectedType, setSelectedType] = useState(FILTER_TYPES.ALL);
  const { data: stores, isLoading, error } = useFetchStores();

  const handleTypeClick = useCallback((type: React.SetStateAction<string>) => {
    setSelectedType(type);
  }, []);

  const filteredShopCards = useMemo(() => {
    if (!stores) return [];
    switch (selectedType) {
      case FILTER_TYPES.ALL:
        return stores;
      case FILTER_TYPES.HOT:
        return stores.filter((store) => store.is_popular);
      case FILTER_TYPES.FAVORITE:
        return stores.filter((store) => store.is_favorite);
      default:
        return stores.filter((store) => store.type === selectedType);
    }
  }, [selectedType, stores]);

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
        <FilterButton
          type={FILTER_TYPES.HOT}
          selectedType={selectedType}
          onClick={handleTypeClick}
          icon={faFire}
        />
        <FilterButton
          type={FILTER_TYPES.FAVORITE}
          selectedType={selectedType}
          onClick={handleTypeClick}
          icon={faStar}
        />
        {Object.values(FILTER_TYPES)
          .slice(2)
          .map((type) => (
            <FilterButton
              key={type}
              type={type}
              selectedType={selectedType}
              onClick={handleTypeClick}
            />
          ))}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredShopCards.map((store) => (
          <ShopCardLink key={store.store_id} store={store} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(StoreListWithFilterFeature);
