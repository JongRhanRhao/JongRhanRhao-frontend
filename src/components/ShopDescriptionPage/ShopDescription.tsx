import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCalendarTimes,
  faClock,
  faInfoCircle,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CommentSection from "@/components/ShopDescriptionPage/CommentSection";
import BookingButton from "@/components/ShopDescriptionPage/BookingButton";
import { SERVER_URL } from "@/lib/helpers/environment";
import { Store } from "@/hooks/useFetchStores";

interface ShopDescriptionProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const ShopDescription: FC<ShopDescriptionProps> = ({ onItemClick }) => {
  const { id } = useParams<{ id: string }>();

  const {
    data: stores,
    isLoading,
    error,
  } = useQuery<Store>({
    queryKey: ["stores", id],
    queryFn: () =>
      fetch(`${SERVER_URL}/stores/api/stores/${id}`).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !stores) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl text-error">
          Error loading shop data. Please try again later.
        </div>
      </div>
    );
  }

  const isAvailable = stores.status === "EVERYDAY";
  const statusClass = isAvailable ? "text-success" : "text-error";
  const safeRating = Math.max(0, Math.min(5, Math.floor(stores.rating)));

  return (
    <div className="flex justify-center h-screen">
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-4 bg-bg">
            <Link to="/">
              <div className="py-2 text-xl text-primary mb-2 font-bold">
                <FontAwesomeIcon icon={faAngleLeft} />
                &nbsp; Back
              </div>
            </Link>
            <div className="flex justify-center">
              <img
                src={stores.image_url as string}
                className="rounded-xl h-96"
                alt="shopImage"
              />
              <div className="rounded-xl p-3 h-36 w-full ml-5">
                <div className="font-bold text-text uppercase text-4xl">
                  {stores.shop_name}{" "}
                </div>
                <div className="mt-1">
                  {[...Array(safeRating)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-yellow-400"
                    />
                  ))}
                  <span className="ml-1">({stores.rating})</span>
                </div>
                <div className="mb-4 mt-2 text-lg text-text font-thai">
                  {stores.description}
                </div>
                <div className="font-bold">
                  <FontAwesomeIcon icon={faClock} />
                  &nbsp; Opening Hours:{" "}
                  <span className="text-text">{stores.open_timebooking}</span>
                </div>
                <div className="font-bold">
                  <FontAwesomeIcon icon={faCalendarTimes} />
                  &nbsp; Reservation Expired time:{" "}
                  <span className="text-text">{stores.cancel_reserve}</span>
                </div>
                <div className="font-bold">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp; Status:{" "}
                  <span className={`${statusClass} font-semibold`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="font-bold">
                  <FontAwesomeIcon icon={faLocationDot} />
                  &nbsp; Address:{" "}
                  <span className="text-text">{stores.address}</span>
                </div>
                <div className="mt-7">
                  <BookingButton />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <CommentSection />
            </div>
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default ShopDescription;
