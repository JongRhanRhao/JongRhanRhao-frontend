import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  const [, setSelectedStore] = useState<Store | null>(null);
  const { t } = useTranslation();

  const handleStoreSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedStoreId = event.target.value;
    const store = stores?.find((store) => store.store_id === selectedStoreId);
    setSelectedStore(store || null);
    onStoreSelect && onStoreSelect(store || null);
    refetch();
  };

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

  if (isLoading) return <p>Loading stores...</p>;
  if (error) return <p>Error fetching stores: {(error as Error).message}</p>;

  if (!Array.isArray(stores) || stores.length === 0) {
    return (
      <p className="p-2 border rounded text-rose-500 border-rose-500">
        No stores available. <br />
      </p>
    );
  }

  return (
    <div>
      <select className={`${className}`} onChange={handleStoreSelection}>
        <option value="">{t("selectYourStore")}</option>
        {stores.map((store: Store) => (
          <option key={store.store_id} value={store.store_id}>
            {store.shop_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreSelector;
