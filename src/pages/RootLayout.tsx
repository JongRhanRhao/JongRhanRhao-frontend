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
      <div className="flex justify-center h-screen overflow-hidden">
        <div className="flex w-full h-full">
          <div className="hidden lg:flex">
            <LeftSidebar onItemClick={onItemClick} />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 flex flex-col p-4 bg-bg overflow-y-auto">
              <div className="flex-grow">
                <Content />
              </div>
              <Footer />
            </main>
          </div>
          <div className="hidden lg:flex">
            <RightSidebar />
          </div>
          <div className="lg:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full">
            <BottomMenu onItemClick={onItemClick} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
