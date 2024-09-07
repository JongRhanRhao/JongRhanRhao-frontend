import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import CommentSection from "@/components/ShopDescriptionPage/CommentSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCalendarTimes,
  faClock,
  faInfoCircle,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import BookingButton from "./BookingButton";
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

  return (
    <div className="flex justify-center h-screen">
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-4 bg-accent2">
            <Link to="/">
              <div className="py-2 text-xl text-primary mb-2">
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
                <div className="font-bold text-gray-300 uppercase text-4xl">
                  {stores.shop_name}
                </div>
                <div className="mb-4 mt-2 font-thai text-lg">
                  {stores.description}
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faClock} />
                  &nbsp; Opening Hours:{" "}
                  <span className="text-gray-400 font-bold">
                    {stores.open_timebooking}
                  </span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faCalendarTimes} />
                  &nbsp; Reservation Expired time:{" "}
                  <span className="text-gray-400 font-bold">
                    {stores.cancel_reserve}
                  </span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp; Status:{" "}
                  <span className={`${statusClass} font-bold`}>
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faLocationDot} />
                  &nbsp; Address:{" "}
                  <span className="text-gray-400">{stores.address}</span>
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
