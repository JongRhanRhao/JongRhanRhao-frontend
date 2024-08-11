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

const ShopDescription: FC<ShopDescriptionProps> = ({
  selectedItem,
  onItemClick,
}) => {
  const { id } = useParams<{ id: string }>();

  // Filter only id
  const shop = shopData[parseInt(id!)] || {
    name: "Not Found",
    description: "Shop not found",
  };

  return (
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <LeftSidebar selectedItem={selectedItem} onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 bg-accent2 overflow-y-auto space-y-10">
            <div className="grid grid-cols-2">
              {/* Left content */}
              <div>
                <img src={shop.image} className="rounded-xl w-1/2"></img>
              </div>
              {/* Right content */}
              <div className="bg-secondary rounded-xl p-3 max-h-36">
                <div className="font-bold text-accent uppercase text-lg">
                  {shop.name}
                </div>
                <div className="font-bold text-accent2 uppercase">
                  OPEN: <span className="text-primary">{shop.openTime}</span>
                </div>
                <div className="font-bold text-accent2">
                  DAY: <span className="text-primary">{shop.day}</span>
                </div>
                <div className="font-bold text-accent2">
                  Reservation Expired time:{" "}
                  <span className="text-primary">{shop.reserveExpired}</span>
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
