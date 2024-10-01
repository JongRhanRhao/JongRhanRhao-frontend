import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Store } from "@/hooks/useFetchStores";
import { SERVER_URL } from "@/lib/variables";

const StoreSelector = ({
  userId,
  className,
  onStoreSelect,
}: {
  userId: string;
  className: string;
  onStoreSelect?: (store: Store | null) => void;
}) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { t } = useTranslation();

  const fetchStoresByUserId = async (userId: string): Promise<Store[]> => {
    const { data } = await axios.get(
      `${SERVER_URL}/stores/api/stores/user/${userId}`
    );
    return Array.isArray(data) ? data : [];
  };

  const {
    data: stores,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stores", userId],
    queryFn: () => fetchStoresByUserId(userId),
  });

  useEffect(() => {
    const savedStoreId = localStorage.getItem("selectedStoreId");
    if (savedStoreId && stores) {
      const storedStore = stores.find(
        (store) => store.store_id === savedStoreId
      );
      setSelectedStore(storedStore || null);
      onStoreSelect && onStoreSelect(storedStore || null);
    }
  }, [stores, onStoreSelect]);

  const handleStoreSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStoreId = event.target.value;
    const store = stores?.find((store) => store.store_id === selectedStoreId);

    if (store) {
      localStorage.setItem("selectedStoreId", selectedStoreId);
    } else {
      localStorage.removeItem("selectedStoreId");
    }

    setSelectedStore(store || null);
    onStoreSelect && onStoreSelect(store || null);
    refetch();
  };

  if (isLoading) return <p>Loading stores...</p>;
  if (error) return <p>Error fetching stores: {(error as Error).message}</p>;

  if (!Array.isArray(stores) || stores.length === 0) {
    return (
      <p className="p-2 text-rose-500">
        {t("No stores available.")}
        <br />
      </p>
    );
  }

  return (
    <div>
      <select
        className={`${className}`}
        onChange={handleStoreSelection}
        value={selectedStore?.store_id || ""}
      >
        <option value="">{t("selectYourStore")}</option>
        {stores.map((store: Store) => (
          <option key={store.store_id} value={store.store_id}>
            {t(store.shop_name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreSelector;
