import { useState } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";

const RootLayout = () => {
  const [selectedItem, setSelectedItem] = useState("Item 1");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <LeftSidebar
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 bg-accent2 overflow-y-auto">
            <Content selectedItem={selectedItem} />
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default RootLayout;
