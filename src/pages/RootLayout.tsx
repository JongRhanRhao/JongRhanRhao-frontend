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
    <div className="flex h-screen">
      <LeftSidebar selectedItem={selectedItem} onItemClick={handleItemClick} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 bg-accent2">
          <Content selectedItem={selectedItem} />
        </main>
      </div>
      <RightSidebar />
    </div>
  );
};

export default RootLayout;
