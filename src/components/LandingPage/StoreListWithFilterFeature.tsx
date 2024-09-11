import React, { useState, useMemo, useCallback, useEffect } from "react";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { useFetchStores } from "@/hooks/useFetchStores";
import { useFetchFavoriteStore } from "@/hooks/useFetchFavoriteStore";
import { useUser } from "@/hooks/useUserStore";
import { FilterButton } from "@/components/shared/FilterButton";
import { DATA_FETCHING_TIME_DELAY, STORE_TYPES } from "@/lib/variables";
import { ShopCardLink } from "@/components/LandingPage/ShopCardLink";

const StoreListWithFilterFeature = () => {
  const [selectedType, setSelectedType] = useState(STORE_TYPES.ALL);
  const [isFakeLoading, setIsFakeLoading] = useState(true);
  const { data: stores, isLoading: isFetchingStores, error } = useFetchStores();
  const { user } = useUser();
  const { data: favoriteStores, isLoading: isFetchingFavorites } =
    useFetchFavoriteStore(user?.userId?.toString() || "");

  const handleTypeClick = useCallback((type: React.SetStateAction<string>) => {
    setSelectedType(type);
    setIsFakeLoading(true);
  }, []);

  const filteredShopCards = useMemo(() => {
    if (!stores) return [];

    switch (selectedType) {
      case STORE_TYPES.ALL:
        return stores;
      case STORE_TYPES.HOT:
        return stores.filter((store) => store.is_popular);
      case STORE_TYPES.FAVORITE:
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
        setIsFakeLoading(false);
      }, DATA_FETCHING_TIME_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isFetchingStores, isFetchingFavorites, selectedType]);

  if (isFetchingStores || isFetchingFavorites || isFakeLoading) {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold text-text mb-5">
          Discover & Booking
        </h2>
        <div className="mb-4 space-x-2">
          <FilterButton
            title={STORE_TYPES.HOT}
            selectedTitle={selectedType}
            onClick={handleTypeClick}
            icon={faFire}
          />
          <FilterButton
            title={STORE_TYPES.FAVORITE}
            selectedTitle={selectedType}
            onClick={handleTypeClick}
            icon={faStar}
          />
          {Object.values(STORE_TYPES)
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
    );
  }

  if (error) {
    return (
      <div className="text-2xl flex justify-center items-center h-full flex-col mt-14">
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
          title={STORE_TYPES.HOT}
          selectedTitle={selectedType}
          onClick={handleTypeClick}
          icon={faFire}
        />
        <FilterButton
          title={STORE_TYPES.FAVORITE}
          selectedTitle={selectedType}
          onClick={handleTypeClick}
          icon={faStar}
        />
        {Object.values(STORE_TYPES)
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
