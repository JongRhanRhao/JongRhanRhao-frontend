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
import { SERVER_URL } from "@/lib/variables";
import { Store } from "@/hooks/useFetchStores";
import SmallScreenMenu from "../shared/SmallScreenMenu";

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
          <main className="flex-1 p-6 bg-bg">
            <Link to="/">
              <div className="py-2 text-xl text-primary mb-4 font-bold flex items-center">
                <FontAwesomeIcon icon={faAngleLeft} />
                <span className="ml-2">Back</span>
              </div>
            </Link>
            <div className="flex flex-col md:flex-row justify-center">
              <img
                src={stores.image_url as string}
                className="rounded-xl h-80 w-full md:w-1/2 object-cover"
                alt="shopImage"
              />
              <div className="rounded-xl p-5 h-auto w-full md:ml-8 mt-5 md:mt-0 shadow-md">
                <div className="font-bold text-text uppercase text-4xl mb-2">
                  {stores.shop_name}
                </div>
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
                <p className="text-lg text-text font-light my-4">
                  {stores.description}
                </p>
                <div className="font-medium text-lg">
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faClock} />
                    <span className="ml-2">
                      Opening Hours: {stores.open_timebooking}
                    </span>
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faCalendarTimes} />
                    <span className="ml-2">
                      Reservation Expiry: {stores.cancel_reserve}
                    </span>
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span className="ml-2">
                      Status:{" "}
                      <span className={`${statusClass} font-semibold`}>
                        {isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </span>
                  </div>
                  <div className="mb-3">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="ml-2">Address: {stores.address}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <BookingButton />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <CommentSection />
            </div>
          </main>
        </div>
        <SmallScreenMenu
          onItemClick={onItemClick}
          className="block md:hidden lg:hidden"
        />
        <RightSidebar className="hidden md:block lg:block" />
      </div>
    </div>
  );
};

export default ShopDescription;
