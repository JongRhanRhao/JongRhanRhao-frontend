import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarTimes,
  faClock,
  faInfoCircle,
  faLocationDot,
  faMapLocationDot,
  faStar,
  faStarHalfAlt,
  faStar as faStarOutline,
} from "@fortawesome/free-solid-svg-icons";
// import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useTranslation } from "react-i18next";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CommentSection from "@/components/ShopDescriptionPage/CommentSection";
import BookingButton from "@/components/ShopDescriptionPage/BookingButton";
import { SERVER_URL } from "@/lib/variables";
import { Store } from "@/hooks/useFetchStores";
import SmallScreenNavMenu from "@/components/shared/SmallScreenNavMenu";
import LinkBack from "@/components/shared/LinkBack";
import FavoriteButton from "@/components/shared/FavoriteButton";
// import { useFetchStoreImages } from "@/hooks/useFetchStoreImages";
import { socket } from "@/socket";
import { useFetchReviews } from "@/hooks/useFetchReviews";
import LoginModal from "@/components/shared/LoginModal";

interface ShopDescriptionProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}
// TODO: Show store image as carousel, add social media links
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

  // const { data: storeImages } = useFetchStoreImages({
  //   storeId: storeId as string,
  // });

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
            <div className="flex flex-col items-center justify-center md:flex-row">
              {/* {storeImages && storeImages.length > 0 && (
                <ImageGallery
                  items={storeImages.map((image) => ({
                    original: image.original,
                    thumbnail: image.thumbnail,
                  }))}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={false}
                  autoPlay
                  slideInterval={3000}
                  lazyLoad
                  additionalClass="custom-gallery"
                />
              )} */}
              {/*  */}
              <img
                src={stores.image_url as string}
                className="object-cover w-full rounded-xl h-80 md:w-1/2"
                alt="shopImage"
              />
              {/*  */}
              <div className="w-full h-auto p-5 mt-5 shadow-md rounded-xl md:ml-8 md:mt-0">
                <div className="flex items-baseline space-x-2">
                  <div className="mb-2 text-4xl font-bold uppercase text-text">
                    {t(stores.shop_name)}
                  </div>
                  <FavoriteButton
                    className="p-1.5 text-2xl bg-secondary rounded-full"
                    storeId={storeId ? storeId : ""}
                  />
                </div>
                {stores && Array.isArray(stores.type) ? (
                  stores.type.map((type: string, index: number) => (
                    <div
                      key={index}
                      className="badge badge-outline text-primary mr-0.5"
                    >
                      {t(type)}
                    </div>
                  ))
                ) : (
                  <span>All</span>
                )}
                <div className="flex items-center mt-1">
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

                  <span className="ml-2 text-lg font-medium">
                    ({safeRating.toFixed(1)})
                  </span>
                  <div className="flex ml-2 text-text">
                    <a
                      href={stores.google_map_link || undefined}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        className="text-text/70"
                        icon={faMapLocationDot}
                      />
                    </a>
                  </div>
                  <a href={stores.facebook_link || undefined}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                      className="w-6 h-6 ml-2"
                    >
                      <linearGradient
                        id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                        x1="9.993"
                        x2="40.615"
                        y1="9.993"
                        y2="40.615"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#2aa4f4"></stop>
                        <stop offset="1" stopColor="#007ad9"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <p className="my-4 text-lg break-words text-text">
                  {stores.description}
                </p>
                <div className="text-lg font-medium">
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faClock} />
                    <span className="ml-2">
                      {t("closeAndOpenTime")}: {stores.open_timebooking}
                    </span>
                  </div>
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faCalendarTimes} />
                    <span className="ml-2">
                      {t("cancel_condition")}: {t(stores.cancel_reserve)}
                    </span>
                  </div>
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span className="ml-2">
                      {t("status")}:{" "}
                      <span
                        className={`${statusClass} animate-pulse font-semibold`}
                      >
                        {t(stores.status)}
                      </span>
                    </span>
                  </div>
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <a
                      href={stores.google_map_link || undefined}
                      target="_blank"
                    >
                      <span className="ml-2 font-thai">
                        {t("address")}:{" "}
                        <span className="link">{stores.address}</span>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mt-6">
                  <BookingButton
                    disabled={isClosed}
                    storeId={stores.store_id}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
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
