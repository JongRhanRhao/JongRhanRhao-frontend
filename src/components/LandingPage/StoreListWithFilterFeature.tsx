import React, { useState, useMemo, useCallback, useEffect } from "react";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";

import BackHomeButton from "@/components/shared/BackHomeButton";
import { useFetchStores } from "@/hooks/useFetchStores";
import { useFetchFavoriteStore } from "@/hooks/useFetchFavoriteStore";
import { useUser } from "@/hooks/useUserStore";
import { FilterButton } from "@/components/shared/FilterButton";
import { DATA_FETCHING_TIME_DELAY, FILTER_TYPES } from "@/lib/variables";
import { ShopCardLink } from "@/components/LandingPage/ShopCardLink";
// TODO: Assign store type in DB

const StoreListWithFilterFeature = () => {
  const [selectedType, setSelectedType] = useState(FILTER_TYPES.ALL);
  const { data: stores, isLoading: isFetchingStores, error } = useFetchStores();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { data: favoriteStores, isLoading: isFetchingFavorites } =
    useFetchFavoriteStore(user?.userId?.toString() || "");

  const handleTypeClick = useCallback((type: React.SetStateAction<string>) => {
    setIsLoading(true);
    setSelectedType(type);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, DATA_FETCHING_TIME_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const filteredShopCards = useMemo(() => {
    if (!stores) return [];
    switch (selectedType) {
      case FILTER_TYPES.ALL:
        return stores;
      case FILTER_TYPES.HOT:
        return stores.filter((store) => store.is_popular);
      case FILTER_TYPES.FAVORITE:
        if (favoriteStores && Array.isArray(favoriteStores)) {
          const favoriteStoreIds = favoriteStores.map((fav) => fav.store_id);
          return stores.filter((store) =>
            favoriteStoreIds.includes(store.store_id)
          );
        }
        return [];
      default:
        return stores.filter((store) => store.type === selectedType);
    }
  }, [selectedType, stores, favoriteStores]);

  useEffect(() => {
    if (!isFetchingStores && !isFetchingFavorites) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, DATA_FETCHING_TIME_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isFetchingStores, isFetchingFavorites]);

  if (isLoading) {
    return (
      <>
        <div className="p-4">
          <h2 className="text-3xl font-bold text-text mb-5">
            Discover & Booking
          </h2>
          <div className="mb-4 space-x-2">
            <FilterButton
              title={FILTER_TYPES.HOT}
              selectedTitle={selectedType}
              onClick={handleTypeClick}
              icon={faFire}
            />
            <FilterButton
              title={FILTER_TYPES.FAVORITE}
              selectedTitle={selectedType}
              onClick={handleTypeClick}
              icon={faStar}
            />
            {Object.values(FILTER_TYPES)
              .slice(2)
              .map((type) => (
                <FilterButton
                  key={type}
                  title={type}
                  selectedTitle={selectedType}
                  onClick={handleTypeClick}
                />
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        </div>
      </>
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
    <div className="container">
      <h2 className="text-3xl font-bold text-text mb-5">Discover & Booking</h2>
      <div className="mb-4 space-x-2">
        <FilterButton
          title={FILTER_TYPES.HOT}
          selectedTitle={selectedType}
          onClick={handleTypeClick}
          icon={faFire}
        />
        <FilterButton
          title={FILTER_TYPES.FAVORITE}
          selectedTitle={selectedType}
          onClick={handleTypeClick}
          icon={faStar}
        />
        {Object.values(FILTER_TYPES)
          .slice(2)
          .map((type) => (
            <FilterButton
              key={type}
              title={type}
              selectedTitle={selectedType}
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

const MemoizedStoreListWithFilterFeature = React.memo(
  StoreListWithFilterFeature
);
export default MemoizedStoreListWithFilterFeature;
