import { useTranslation } from "react-i18next";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FavoriteButton from "@/components/shared/FavoriteButton";
import { useFetchReviews } from "@/hooks/useFetchReviews";

export interface ShopCardProps {
  id: string;
  image: string | null;
  title: string;
  storeStatus: string;
  reservationStatus: string;
  rating: number;
  type: string[];
  open_timebooking: string;
  description: string | null;
  className?: string;
  ImageSliderClass?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id: storeId,
  image,
  title,
  // storeStatus,
  reservationStatus,
  storeStatus,
  open_timebooking,
  className,
  ImageSliderClass,
  type,
}) => {
  const isAvailable = storeStatus === "Available";
  const reservationClass = `absolute top-3 text-secondary text-xs font-bold px-2 py-1 rounded-r-lg ${
    isAvailable ? "bg-primary/80" : "bg-rose-500/80"
  }`;
  // const seatCountClass = `mt-2 ${isAvailable ? "text-text" : "text-red-500"}`;
  const { t } = useTranslation();

  const { data: reviews } = useFetchReviews(storeId as string);
  const totalReviews = reviews?.length ?? 0;
  const totalRating = (reviews ?? [])
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);
  const rating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
  const base5Rating = Math.min(Math.max(Number(rating), 0), 5);
  const safeRating = Math.max(0, Math.min(5, base5Rating));

  return (
    <div
      className={`relative shadow-lg cursor-pointer overflow-hidden m-a1 wh-auto flex-shrink-0`}
    >
      <div className="relative">
        {image ? (
          <img
            src={
              image ||
              "https://static.vecteezy.com/system/resources/previews/009/007/134/original/failed-to-load-page-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            }
            alt={title}
            className={`w-full object-cover duration-150 ease-out aspect-auto lg:h-60 md:h-80 sm:h-32 ${className}`}
          />
        ) : (
          <div className="w-full skeleton h-60"></div>
        )}

        <div
          className={`${ImageSliderClass} absolute top-3 text-xs font-bold px-2 py-1 rounded-r-lg rounded-tl-lg shadow-lg ${reservationClass}`}
        >
          {reservationStatus}
        </div>
        <div
          className={`${ImageSliderClass} bg-secondary rounded-xl px-1 absolute text-lg text-white top-2 right-2`}
        >
          <FavoriteButton storeId={storeId} />
        </div>

        <div
          className={`${ImageSliderClass} absolute px-2 py-1 rounded-r bottom-1`}
        >
          <div className="px-1 text-sm badge w-fit rounded-xl space-x-2 bg-secondary/80 text-text">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-400 shadow-lg"
            />
            <div>
              {safeRating === 0 ? t("No Rating") : safeRating.toFixed(1)}
            </div>
          </div>
          <div
            className={`badge space-x-2 bg-secondary/80 w-fit rounded-xl px-1`}
          >
            <FontAwesomeIcon icon={faClock} className="text-xs text-text" />
            <div className={`text-text text-xs`}>{open_timebooking}</div>
          </div>
          <br />
          {type && Array.isArray(type) ? (
            type.map((type: string, index: number) => (
              <div
                key={index}
                className={`badge badge-ghost bg-secondary/80 text-xs text-text mr-0.5`}
              >
                {t(type)}
              </div>
            ))
          ) : (
            <span>All</span>
          )}
          {/* <div className="opacity-75">
            <span>{storeStatus}</span>
          </div>
          <p className={`mb-1 ${seatCountClass} shadow-lg animate-pulse`}>
            {currSeats} / {maxSeats}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
