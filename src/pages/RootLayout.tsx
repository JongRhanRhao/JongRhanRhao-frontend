import React from "react";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";
import Footer from "@/components/shared/Footer";
import { SidebarProvider } from "@/contexts/SideBarContext";
import BottomMenu from "@/components/shared/BottomMenu";

interface RootLayoutProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ onItemClick }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-bg">
        <LeftSidebar onItemClick={onItemClick} className="hidden lg:block" />

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 md:px-6 lg:px-8">
              <Content />
            </div>
            <Footer className="mt-8" />
          </div>
        </main>

        <RightSidebar className="hidden lg:block md:block" />

        <BottomMenu
          onItemClick={onItemClick}
          className="block md:hidden lg:hidden"
        />
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
