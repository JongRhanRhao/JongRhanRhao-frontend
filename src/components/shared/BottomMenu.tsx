import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faStore,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import { GLOBAL_URL_ROUTES } from "@/lib/helpers/environment";

interface BottomMenuProps {
  onItemClick: (item: string) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      name: "Discover",
      key: "Item 1",
      icon: faHome,
      path: `${GLOBAL_URL_ROUTES.landingPage}`,
    },
    {
      name: "Status",
      key: "Item 4",
      icon: faClock,
      path: `${GLOBAL_URL_ROUTES.reserveStatus}`,
    },
    {
      name: "My Store",
      key: "Item 5",
      icon: faStore,
      path: `${GLOBAL_URL_ROUTES.storeManagement}`,
    },
    {
      name: "Setting",
      key: "Item 6",
      icon: faCog,
      path: `${GLOBAL_URL_ROUTES.setting}`,
    },
  ];

  const handleItemClick = (item: { key: string; path: string }) => {
    onItemClick(item.key);
    navigate(item.path);
  };

  return (
    <div className="fixed bottom-7 left-1/2 transform -translate-x-1/2 space-x-5 p-3 gap-1 bg-accent shadow-lg flex text-white justify-around rounded-full">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.key}
            className={`flex flex-col items-center btn bg-accent hover:bg-accent border-none ${
              isActive ? "text-primary" : "text-white"
            }`}
            onClick={() => handleItemClick(item)}
          >
            <FontAwesomeIcon icon={item.icon} size="lg" />
          </button>
        );
      })}
    </div>
  );
};

export default BottomMenu;