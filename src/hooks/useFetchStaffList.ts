import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/lib/variables";
import { User } from "@/hooks/useUserStore";

export const useFetchStaffList = ({ storeId }: { storeId: string }) => {
  return useQuery<User[]>({
    queryFn: async () =>
      fetch(`${SERVER_URL}/stores/api/stores/${storeId}/staff`).then((res) =>
        res.json()
      ),
    queryKey: ["stores"],
  });
};
