import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarTimes,
  faClock,
  faInfoCircle,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "react-image-gallery";
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
import { useFetchStoreImages } from "@/hooks/useFetchStoreImages";
import { socket } from "@/socket";

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

  const { data: storeImages } = useFetchStoreImages({
    storeId: storeId as string,
  });

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
  const safeRating = Math.max(0, Math.min(5, Math.floor(stores.rating)));

  return (
    <div className="flex justify-center h-screen">
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1 p-6 bg-bg">
            <div className="flex justify-between items-baseline">
              <LinkBack />
              <div className=" justify-end">
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
            <div className="flex flex-col justify-center md:flex-row items-center">
              {storeImages && storeImages.length > 0 && (
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
              )}
              {/*  */}
              <img
                src={stores.image_url as string}
                className="object-cover w-full rounded-xl h-80 md:w-1/2"
                alt="shopImage"
              />
              <div className="w-full h-auto p-5 mt-5 shadow-md rounded-xl md:ml-8 md:mt-0">
                <div className="flex items-baseline space-x-2">
                  <div className="mb-2 text-4xl font-bold uppercase text-text">
                    {t(stores.shop_name)}
                  </div>
                  <FavoriteButton
                    className="text-2xl bg-secondary p-1 rounded"
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
                <div className="mt-1">
                  {[...Array(safeRating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">
                    ({stores.rating})
                  </span>
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
                      {t("cancel_condition")}: {stores.cancel_reserve}
                    </span>
                  </div>
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span className="ml-2">
                      {t("status")}:{" "}
                      <span
                        className={`${statusClass} animate-pulse font-semibold`}
                      >
                        {stores.status}
                      </span>
                    </span>
                  </div>
                  <div className="mb-3 text-text/70">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="ml-2 font-thai">
                      {t("address")}: {stores.address}
                    </span>
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
