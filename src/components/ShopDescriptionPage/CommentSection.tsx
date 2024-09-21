import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/useUserStore";
import CommentCard from "@/components/ShopDescriptionPage/CommentCard";
import { Review, useFetchReviews } from "@/hooks/useFetchReviews";
import { SERVER_URL } from "@/lib/variables";
import useModalStore from "@/hooks/useModalStore";

const CommentSection = () => {
  const REVIEW_TEXT_LIMIT = 100;
  const { id } = useParams<{ id: string }>();
  const shopId = id!;
  const { t } = useTranslation();
  const { user, isAuthenticated } = useUser();
  const [isReply, setIsReply] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { data: reviews, refetch } = useFetchReviews(shopId);
  const { openLoginModal } = useModalStore();

  const reviewData: Review = {
    customerId: user?.userId ? String(user.userId) : "",
    shopId,
    reviewText,
    rating,
    userName: user?.userName || "",
    avatarUrl: user?.profilePicture || "",
    createdAt: new Date().toISOString(),
  };

  const handleReview = async () => {
    try {
      await axios.post(`${SERVER_URL}/stores/api/reviews`, reviewData);
      await refetch();
      setReviewText("");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const reviewStatus = () => {
    toast.promise(handleReview(), {
      loading: "Submitting review...",
      success: "Review submitted successfully!",
      error: "Error submitting review, please try again.",
    });
  };

  return (
    <div className="space-y-3">
      <div className="text-xl font-medium text-text">
        {t("Comments")} ({reviews?.length})
      </div>
      {!isAuthenticated && (
        <button onClick={openLoginModal}>
          <div className="text-text/50 hover:text-text/70 duration-150">
            {t("Login to comment")}
          </div>
        </button>
      )}
      {isAuthenticated && (
        <div className="relative flex flex-col  text-text">
          <div className="relative w-1/3 min-w-fit bg-bg rounded-xl">
            <input
              type="text"
              onFocus={setIsReply.bind(null, true)}
              className="w-full break-words pr-10 mt-2 textarea focus:border-none focus:outline-none bg-secondary placeholder:text-text/50 placeholder:text-sm"
              placeholder={`${t("Reply as")} ${user?.userName}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  reviewStatus();
                }
              }}
              maxLength={REVIEW_TEXT_LIMIT}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {isReply && (
              <div className="mb-2 mt-1 ml-4 text-sm text-left text-gray-500">
                {reviewText?.length}/{REVIEW_TEXT_LIMIT}
              </div>
            )}
            <div className="absolute bottom-11 right-0">
              {isReply && (
                <button
                  className="text-sm btn btn-xs bg-primary text-secondary"
                  disabled={reviewText == ""}
                  onClick={reviewStatus}
                >
                  {t("Send")}
                </button>
              )}
            </div>
            {isReply && (
              <div className="items-center mb-4 ml-4 rating rating-sm">
                <p className="mr-2 text-sm text-text">{t("Rating")}: </p>
                <input
                  type="radio"
                  name="rating-5"
                  className="bg-yellow-500 mask mask-star-2"
                  checked={rating === 1}
                  onChange={() => setRating(1)}
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="bg-yellow-500 mask mask-star-2"
                  checked={rating === 2}
                  onChange={() => setRating(2)}
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="bg-yellow-500 mask mask-star-2"
                  checked={rating === 3}
                  onChange={() => setRating(3)}
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="bg-yellow-500 mask mask-star-2"
                  checked={rating === 4}
                  onChange={() => setRating(4)}
                />
                <input
                  type="radio"
                  name="rating-5"
                  className="bg-yellow-500 mask mask-star-2"
                  checked={rating === 5}
                  onChange={() => setRating(5)}
                />
                <div className="mt-1 ml-1 text-sm text-text/50">({rating})</div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex overflow-x-auto gap-2 whitespace-nowrap">
        {reviews?.map((review) => (
          <CommentCard
            key={review.reviewId}
            name={review.userName}
            avatar={review.avatarUrl}
            comment={review.reviewText}
            date={review.createdAt}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
