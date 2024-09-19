import { useQuery } from "@tanstack/react-query";

import { SERVER_URL } from "@/lib/variables";

export interface Review {
  reviewId?: string;
  shopId: string;
  userName: string;
  customerId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  avatarUrl: string;
}

export const useFetchReviews = (shopId: string) => {
  return useQuery<Review[], Error>({
    queryFn: async () =>
      fetch(`${SERVER_URL}/stores/api/reviews/${shopId}`).then((res) =>
        res.json()
      ),
    queryKey: ["reviewsTable", shopId],
  });
};
