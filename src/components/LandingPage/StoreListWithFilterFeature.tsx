import React, { useState, useMemo, useCallback, useEffect } from "react";
import { faFire, faStar } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useFetchStores } from "@/hooks/useFetchStores";
import { useUser } from "@/hooks/useUserStore";
import { useFetchFavoriteStore } from "@/hooks/useFetchFavoriteStore";
import {
  DATA_FETCHING_DELAY_TIME,
  ERROR_TEXT,
  STORE_TYPES_FOR_FILTER_BTN,
} from "@/lib/variables";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { FilterButton } from "@/components/shared/FilterButton";
import { ShopCardLink } from "@/components/LandingPage/ShopCardLink";
import { socket } from "@/socket";
import SearchBar from "@/components/shared/SearchBar";

const StoreListWithFilterFeature = () => {
  const [selectedType, setSelectedType] = useState(
    STORE_TYPES_FOR_FILTER_BTN.ALL
  );
  const { t } = useTranslation();
  const [isFakeLoading, setIsFakeLoading] = useState(true);
  const {
    data: stores,
    isLoading: isFetchingStores,
    error,
    refetch: refetchStoreData,
  } = useFetchStores();
  const { user, isAuthenticated } = useUser();
  const {
    data: favoriteStores,
    isLoading: isFetchingFavorites,
    refetch: refetchFavroiteStore,
  } = useFetchFavoriteStore(user?.userId?.toString() || "");

  useEffect(() => {
    if (stores) {
      socket.on("store_update", (data) => {
        if (data.storeId) {
          refetchStoreData();
        }
      });
    }
    return () => {
      socket.off("store_update");
    };
  }, [stores, refetchStoreData]);

  const handleTypeClick = useCallback(
    (type: React.SetStateAction<string>) => {
      setSelectedType(type);
      setIsFakeLoading(true);
      refetchFavroiteStore();
      refetchStoreData();
    },
    [refetchFavroiteStore, refetchStoreData]
  );

  const filteredShopCards = useMemo(() => {
    if (!Array.isArray(stores)) return [];

    switch (selectedType) {
      case STORE_TYPES_FOR_FILTER_BTN.ALL:
        return Array.isArray(stores) ? stores : [];
      case STORE_TYPES_FOR_FILTER_BTN.HOT:
        return Array.isArray(stores)
          ? stores.filter((store) => store.is_popular)
          : [];
      case STORE_TYPES_FOR_FILTER_BTN.FAVORITE:
        if (favoriteStores && Array.isArray(favoriteStores)) {
          const favoriteStoreIds = favoriteStores.map((fav) => fav.store_id);
          return Array.isArray(stores)
            ? stores.filter((store) =>
                favoriteStoreIds.includes(store.store_id)
              )
            : [];
        }
        return [];
      default:
        return Array.isArray(stores)
          ? stores.filter((store) => store.type.includes(selectedType))
          : [];
    }
  }, [selectedType, stores, favoriteStores]);

  useEffect(() => {
    if (!isFetchingStores && !isFetchingFavorites) {
      const timer = setTimeout(() => {
        setIsFakeLoading(false);
      }, DATA_FETCHING_DELAY_TIME);

      return () => clearTimeout(timer);
    }
  }, [isFetchingStores, isFetchingFavorites, selectedType]);

  if (isFetchingStores || isFetchingFavorites || isFakeLoading) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mt-5 mb-3 text-3xl font-bold text-text">
            {t("DiscoverAndBooking")}
          </h2>
          <div className="hidden mr-4 md:block lg:block xl:block">
            <SearchBar />
          </div>
        </div>
        <div className="overflow-x-auto space-x-1 filter-container whitespace-nowrap">
          <FilterButton
            title={STORE_TYPES_FOR_FILTER_BTN.HOT}
            selectedTitle={selectedType}
            onClick={handleTypeClick}
            icon={faFire}
          />
          {isAuthenticated && (
            <FilterButton
              title={STORE_TYPES_FOR_FILTER_BTN.FAVORITE}
              selectedTitle={selectedType}
              onClick={handleTypeClick}
              icon={faStar}
            />
          )}
          {Object.values(STORE_TYPES_FOR_FILTER_BTN)
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
      <div className="flex flex-col items-center justify-center h-full text-2xl mt-14">
        {ERROR_TEXT}
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mt-5 mb-3 text-3xl font-bold text-text">
          {t("DiscoverAndBooking")}
        </h2>
        <div className="hidden mr-4 md:block lg:block xl:block">
          <SearchBar />
        </div>
      </div>
      <div className="overflow-x-auto space-x-1 filter-container whitespace-nowrap">
        <FilterButton
          title={STORE_TYPES_FOR_FILTER_BTN.HOT}
          selectedTitle={selectedType}
          onClick={handleTypeClick}
          icon={faFire}
        />
        {isAuthenticated && (
          <FilterButton
            title={STORE_TYPES_FOR_FILTER_BTN.FAVORITE}
            selectedTitle={selectedType}
            onClick={handleTypeClick}
            icon={faStar}
          />
        )}
        {Object.values(STORE_TYPES_FOR_FILTER_BTN)
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
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
