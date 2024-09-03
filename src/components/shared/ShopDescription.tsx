import { FC } from "react";
import { Link, useParams } from "react-router-dom";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { shopData } from "@/SampleData/data";
import CommentSection from "@/components/CommentSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCalendarTimes,
  faClock,
  faInfoCircle,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import BookingButton from "../BookingButton";

interface ShopDescriptionProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const ShopDescription: FC<ShopDescriptionProps> = ({ onItemClick }) => {
  const { id } = useParams<{ id: string }>();
  const shop = shopData[parseInt(id!)] || {
    name: "Not Found",
    description: "Shop not found",
  };
  const isAvailable = shop.status === "Busy";
  const isBusy = isAvailable ? "text-red-500" : "text-green-500";

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
                src={shop.image}
                className="rounded-xl h-96"
                alt="shopImage"
              ></img>
              <div className="rounded-xl p-3 h-36 w-full ml-5">
                <div className="font-bold text-gray-300 uppercase text-4xl">
                  {shop.name}
                </div>
                <div className="mb-4 mt-2">{shop.description}</div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faClock} />
                  &nbsp; Opening Hours :{" "}
                  <span className="text-gray-400 font-bold">
                    {shop.openTime}
                  </span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faCalendarTimes} />
                  &nbsp; Reservation Expired time:{" "}
                  <span className="text-gray-400 font-bold">
                    {shop.reserveExpired}
                  </span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp; Status:{" "}
                  <span className={`${isBusy} font-bold`}>{shop.status}</span>
                </div>
                <div className="font-bold text-gray-300">
                  <FontAwesomeIcon icon={faLocationDot} />
                  &nbsp; Address:{" "}
                  <span className="text-gray-400">{shop.address}</span>
                </div>
                <div className="mt-7">
                  <BookingButton />
                </div>
              </div>
              {/* Comment Section */}
            </div>
            <CommentSection />
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default ShopDescription;
