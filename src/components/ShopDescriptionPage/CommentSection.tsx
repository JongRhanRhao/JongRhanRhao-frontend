import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "@/hooks/useUserStore";
import CommentCard from "@/components/ShopDescriptionPage/CommentCard";
import { Review, useFetchReviews } from "@/hooks/useFetchReviews";
import { SERVER_URL } from "@/lib/variables";

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = id!;
  const { t } = useTranslation();
  const { user, isAuthenticated } = useUser();
  const [isReply, setIsReply] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { data: reviews, refetch } = useFetchReviews(shopId);

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
    // console.log(reviewData)
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
        <div className="text-text/50">{t("Login to comment")}</div>
      )}
      {isAuthenticated && (
        <div className="relative flex flex-col  text-text">
          <div className="relative w-1/3 min-w-fit bg-secondary rounded-xl">
            <input
              type="text"
              onFocus={setIsReply.bind(null, true)}
              className="w-full pr-10 mt-2 textarea focus:border-none focus:outline-none bg-secondary placeholder:text-text/50 placeholder:text-sm"
              placeholder={`${t("Reply as")} ${user?.userName}`}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="absolute bottom-3 right-4">
              <button disabled={reviewText == ""} onClick={reviewStatus}>
                <FontAwesomeIcon
                  className={`p-1 rounded-full duration-150 ${
                    reviewText == ""
                      ? "text-secondary/50 bg-primary/50"
                      : "text-secondary bg-primary"
                  }`}
                  icon={faWineBottle}
                />
              </button>
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
                <div className="ml-1 mt-1 text-sm text-text/50">({rating})</div>
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
