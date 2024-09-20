import React from "react";
import { useTranslation } from "react-i18next";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Content from "@/components/layout/Content";
import Footer from "@/components/shared/Footer";
import SmallScreenNavMenu from "@/components/shared/SmallScreenNavMenu";
import LoginModal from "@/components/shared/LoginModal";

interface RootLayoutProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const RootLayout: React.FC<RootLayoutProps> = ({ onItemClick }) => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const isThai = i18n.language === "th";

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <LoginModal />
      <LeftSidebar
        onItemClick={onItemClick}
        className="relative z-10 hidden lg:block"
      />
      <main className="relative flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="px-4 py-6 md:px-6 lg:px-8">
            <div className="flex justify-end mb-4">
              <button
                className={`${isThai ? "" : "text-text"}`}
                onClick={() => changeLanguage("en")}
              >
                English
              </button>
              <span className="m-2">|</span>
              <button
                className={`${!isThai ? "" : "text-text"}`}
                onClick={() => changeLanguage("th")}
              >
                ไทย
              </button>
            </div>
            <Content />
          </div>
          <Footer className="mt-8" />
        </div>
      </main>
      <RightSidebar className="relative z-10 hidden lg:block md:block" />
      <SmallScreenNavMenu
        onItemClick={onItemClick}
        className="z-20 block md:hidden lg:hidden"
      />
    </div>
  );
};

export default RootLayout;
