import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPaperPlane,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

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
      loading: t("Submitting review..."),
      success: t("Review submitted successfully!"),
      error: t("Something went wrong. Please try again."),
    });
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
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
        <div className="w-full max-w-md p-2 shadow-lg space-y-1 bg-secondary/50 rounded-xl">
          <textarea
            className="w-full p-3 text-sm rounded-lg resize-none bg-bg focus:ring-2 focus:ring-primary focus:outline-none"
            rows={4}
            placeholder={`${t("Reply as")} ${user?.userName}`}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            onFocus={() => setIsReply(true)}
            maxLength={REVIEW_TEXT_LIMIT}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                reviewStatus();
              }
            }}
          />

          {isReply && (
            <>
              <div className="flex items-center justify-between text-sm text-text/70">
                <div className="flex items-center space-x-1">
                  <span>{t("Rating")}:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`focus:outline-none transition-colors ${
                        star <= rating
                          ? "text-yellow-500"
                          : "text-text hover:text-yellow-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </button>
                  ))}
                  <span className="ml-2">({rating})</span>
                </div>
                <span>
                  {reviewText.length}/{REVIEW_TEXT_LIMIT}
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  className={`px-4 py-2 text-sm font-medium text-secondary rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    reviewText === ""
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/80"
                  }`}
                  disabled={reviewText === ""}
                  onClick={reviewStatus}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  {t("Send")}
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {(reviews?.length ?? 0) > 0 && (
        <div className="relative">
          {(reviews?.length ?? 0) > 4 && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 px-2 rounded-full shadow-md top-1/2 transform -translate-y-1/2 bg-secondary/50 text-text"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto break-words gap-2 whitespace-nowrap scroll-smooth"
          >
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

          {(reviews?.length ?? 0) > 4 && (
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 px-2 rounded-full shadow-md top-1/2 transform -translate-y-1/2 bg-secondary/50 text-text"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
