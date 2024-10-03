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
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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
  const safeRating = Math.max(0, Math.min(5, base5Rating));
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
              <div className="justify-end">
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
              <div className="container px-4 py-8 mx-auto">
                <div className="flex flex-col overflow-hidden rounded-lg md:flex-row bg-secondary/20">
                  <div className="relative md:w-1/2">
                    <img
                      src={stores.image_url ?? ""}
                      alt={stores.shop_name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="relative overflow-hidden md:w-1/2">
                    <div
                      className="absolute inset-0 bg-center bg-cover opacity-50 filter blur-md"
                      style={{
                        backgroundImage: `url(${stores.image_url ?? ""})`,
                      }}
                    ></div>

                    <div className="relative z-10 h-full p-8 text-text bg-secondary/50">
                      <h1 className="mb-4 text-4xl font-bold">
                        {t(stores.shop_name)}
                      </h1>

                      <div className="mb-8 space-y-4">
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
                        <button className="flex items-center px-4 py-2 border rounded-full border-text">
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
                          className="p-2 border rounded-full border-text"
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
            <div className="mb-10 divider"></div>
            <div
              ref={ref}
              className="flex flex-col items-center h-auto gap-y-10"
            >
              <motion.img
                src={stores.image_url ?? ""}
                className="size-1/2"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.p
                className="mt-4 leading-relaxed text-text"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                {stores.description}
              </motion.p>
            </div>
            <div className="mt-20">
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
