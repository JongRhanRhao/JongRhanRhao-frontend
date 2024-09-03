import React from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/contexts/SideBarContext";

interface RootLayoutProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ onItemClick }) => {
  return (
    <SidebarProvider>
      <div className="flex justify-center h-screen overflow-hidden">
        <div className="flex w-full h-full">
          <LeftSidebar onItemClick={onItemClick} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 flex flex-col p-4 bg-accent2 overflow-y-auto">
              <div className="flex-grow">
                <Content />
              </div>
              <Footer />
            </main>
          </div>
          <RightSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
