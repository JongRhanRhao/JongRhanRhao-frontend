import React from "react";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";
import Footer from "@/components/shared/Footer";
import SmallScreenNavMenu from "@/components/shared/SmallScreenNavMenu";

interface RootLayoutProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}
// TODO: add chat with admin feature
const RootLayout: React.FC<RootLayoutProps> = ({ onItemClick }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <LeftSidebar onItemClick={onItemClick} className="hidden lg:block" />

      <main className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 md:px-6 lg:px-8">
            <Content />
          </div>
          <Footer className="mt-8" />
        </div>
      </main>

      <RightSidebar className="hidden lg:block md:block" />

      <SmallScreenNavMenu
        onItemClick={onItemClick}
        className="block md:hidden lg:hidden"
      />
    </div>
  );
};

export default RootLayout;
