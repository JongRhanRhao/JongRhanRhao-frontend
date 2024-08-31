import { FC } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";

interface RootLayoutProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const RootLayout: FC<RootLayoutProps> = ({ onItemClick }) => {
  return (
    <div className="flex justify-center h-screen overflow-hidden">
      <div className="flex w-full h-full">
        <LeftSidebar onItemClick={onItemClick} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 bg-accent2 overflow-y-auto">
            <Content />
          </main>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default RootLayout;
