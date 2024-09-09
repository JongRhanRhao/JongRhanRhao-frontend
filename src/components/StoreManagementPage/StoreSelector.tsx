import { Store } from "@/hooks/useFetchStores";
import { SERVER_URL } from "@/lib/variables";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStoresByUserId = async (userId: string): Promise<Store[]> => {
  const { data } = await axios.get(
    `${SERVER_URL}/stores/api/stores/user/${userId}`
  );
  return Array.isArray(data) ? data : [];
};

const StoreSelector = ({
  userId,
  className,
}: {
  userId: string;
  className: string;
}) => {
  const {
    data: stores,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stores", userId],
    queryFn: () => fetchStoresByUserId(userId),
  });

  if (isLoading) return <p>Loading stores...</p>;
  if (error) return <p>Error fetching stores: {(error as Error).message}</p>;

  if (!Array.isArray(stores) || stores.length === 0) {
    return <p>No stores available.</p>;
  }

  return (
    <div>
      <h2 className="text-text font-semibold">Select your store to manage</h2>
      <select className={`${className} mt-2 mb-2`}>
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
