import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/lib/variables";

interface StoreImage {
  original: string;
  thumbnail: string;
}

export const useFetchStoreImages = ({ storeId }: { storeId: string }) => {
  return useQuery<StoreImage[]>({
    queryFn: async () =>
      fetch(`${SERVER_URL}/stores/api/stores/${storeId}/images`).then((res) =>
        res.json()
      ),
    queryKey: ["store_images", storeId],
  });
};
