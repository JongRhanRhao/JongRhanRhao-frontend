import { FC } from "react";
import { useParams } from "react-router-dom";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { shopData } from "@/SampleData/data";
import CommentSection from "@/components/CommentSection";

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
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 bg-accent2 overflow-y-auto space-y-10">
            <div className="flex justify-center">
              <img src={shop.image} className="rounded-xl h-96"></img>
              <div className="bg-secondary rounded-xl p-3 max-h-32 w-full ml-5">
                <div className="font-bold text-accent uppercase text-lg">
                  {shop.name}
                </div>
                <div className="font-bold text-gray-500">
                  Opening Hours :{" "}
                  <span className="text-primary font-bold">
                    {shop.openTime}
                  </span>
                </div>
                <div className="font-bold text-gray-500">
                  Reservation Expired time:{" "}
                  <span className="text-primary font-bold">
                    {shop.reserveExpired}
                  </span>
                </div>
                <div className="font-bold text-gray-500">
                  Status:{" "}
                  <span className={`${isBusy} font-bold`}>{shop.status}</span>
                </div>
              </div>
            </div>
            {/* Comment Section */}
            <CommentSection />
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default ShopDescription;
