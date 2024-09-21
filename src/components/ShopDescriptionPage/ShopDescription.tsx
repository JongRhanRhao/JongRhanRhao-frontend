import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faInfoCircle,
  faLocationDot,
  faMapLocationDot,
  faStar,
  faStarHalfAlt,
  faStar as faStarOutline,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CommentSection from "@/components/ShopDescriptionPage/CommentSection";
import BookingButton from "@/components/ShopDescriptionPage/BookingButton";
import { SERVER_URL } from "@/lib/variables";
import { Store } from "@/hooks/useFetchStores";
import SmallScreenNavMenu from "@/components/shared/SmallScreenNavMenu";
import LinkBack from "@/components/shared/LinkBack";
import { socket } from "@/socket";
import { useFetchReviews } from "@/hooks/useFetchReviews";
import LoginModal from "@/components/shared/LoginModal";

interface ShopDescriptionProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const ShopDescription: FC<ShopDescriptionProps> = ({ onItemClick }) => {
  const { id: storeId } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const isThai = i18n.language === "th";
  const { t } = useTranslation();

  const {
    data: stores,
    isLoading,
    error,
    refetch,
  } = useQuery<Store>({
    queryKey: ["stores", storeId],
    queryFn: () =>
      fetch(`${SERVER_URL}/stores/api/stores/${storeId}`).then((res) =>
        res.json()
      ),
  });

  const { data: reviews } = useFetchReviews(stores?.store_id as string);

  useEffect(() => {
    if (stores) {
      socket.on("store_update", (data) => {
        if (data.storeId === storeId) {
          refetch();
        }
      });
    }

    return () => {
      socket.off("store_update");
    };
  }, [stores, storeId, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !stores) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-error">
          Error loading shop data. Please try again later.
        </div>
      </div>
    );
  }

  const isAvailable = stores.status === "Available";
  const isBusy = stores.status === "Busy";
  const isClosed = stores.status === "Closed";
  const statusClass = isAvailable
    ? "text-primary"
    : isBusy
    ? "text-warning"
    : isClosed
    ? "text-error"
    : "text-error";
  const totalReviews = reviews?.length ?? 0;
  const totalRating = (reviews ?? [])
    .map((review) => review.rating)
    .reduce((a, b) => a + b, 0);
  const rating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
  const base5Rating = Math.min(Math.max(Number(rating), 0), 5);
  const safeRating = Math.max(0, Math.min(5, Math.floor(base5Rating)));
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(safeRating);

  return (
    <div className="flex justify-center h-screen">
      <LoginModal />
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1 p-6 bg-bg">
            <div className="flex items-baseline justify-between">
              <LinkBack />
              <div className="justify-end ">
                <button
                  className={`${isThai ? "" : "text-text"}`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <span className="m-2">|</span>
                <button
                  className={`${!isThai ? "" : "text-text"}`}
                  onClick={() => changeLanguage("th")}
                >
                  ไทย
                </button>
              </div>
            </div>
            <div className="relative w-full h-auto">
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row bg-secondary/20 rounded-lg overflow-hidden">
                  <div className="md:w-1/2 relative">
                    <img
                      src={stores.image_url ?? ""}
                      alt={stores.shop_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:w-1/2 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center filter blur-md opacity-50"
                      style={{
                        backgroundImage: `url(${stores.image_url ?? ""})`,
                      }}
                    ></div>

                    <div className="relative z-10 p-8 text-text bg-secondary/50 h-full">
                      <h1 className="text-4xl font-bold mb-4">
                        {t(stores.shop_name)}
                      </h1>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-2" />
                          <span>
                            {t("closeAndOpenTime")}: {stores.open_timebooking}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-2"
                          />
                          <span>{stores.address}</span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faStar} className="mr-2" />
                          <span>
                            {[...Array(fullStars)].map((_, i) => (
                              <FontAwesomeIcon
                                key={`full-${i}`}
                                icon={faStar}
                                className="text-yellow-400"
                              />
                            ))}
                            {hasHalfStar && (
                              <FontAwesomeIcon
                                key="half"
                                icon={faStarHalfAlt}
                                className="text-yellow-400"
                              />
                            )}
                            {[...Array(emptyStars)].map((_, i) => (
                              <FontAwesomeIcon
                                key={`empty-${i}`}
                                icon={faStarOutline}
                                className="text-gray-300"
                              />
                            ))}
                            <span className="ml-2">
                              ({safeRating.toFixed(1)})
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button className="border border-text px-4 py-2 rounded-full flex items-center">
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="mr-2"
                          />
                          {t("status")}:{" "}
                          <span
                            className={`${statusClass} animate-pulse font-semibold ml-1`}
                          >
                            {t(stores.status)}
                          </span>
                        </button>
                        <a
                          href={stores.google_map_link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-text p-2 rounded-full"
                        >
                          <FontAwesomeIcon icon={faMapLocationDot} />
                        </a>
                      </div>

                      <div className="mt-6">
                        <BookingButton
                          disabled={isClosed}
                          storeId={stores.store_id}
                          storeName={stores.shop_name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="h-auto flex flex-col items-center gap-y-10">
              <img src={stores.image_url ?? ""} className="size-1/2"></img>
              <p className="text-text">{stores.description}</p>
            </div>
            <div className="mt-10">
              <CommentSection />
            </div>
          </main>
        </div>
        <SmallScreenNavMenu
          onItemClick={onItemClick}
          className="block md:hidden lg:hidden"
        />
        <RightSidebar className="hidden md:block lg:block" />
      </div>
    </div>
  );
};

export default ShopDescription;
