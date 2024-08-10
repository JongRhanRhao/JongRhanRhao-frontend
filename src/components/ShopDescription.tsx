import { FC } from "react";
import { useParams } from "react-router-dom";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { shopData } from "@/SampleData/data";

interface ShopDescriptionProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const ShopDescription: FC<ShopDescriptionProps> = ({
  selectedItem,
  onItemClick,
}) => {
  const { id } = useParams<{ id: string }>();

  const shop = shopData[parseInt(id!)] || {
    name: "Not Found",
    description: "Shop not found",
  };

  return (
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <LeftSidebar selectedItem={selectedItem} onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 bg-accent2 overflow-y-auto">
            <h1 className="text-2xl font-bold">{shop.name}</h1>
            <p>{shop.description}</p>
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default ShopDescription;
