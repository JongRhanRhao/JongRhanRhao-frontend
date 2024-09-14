import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faStore,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import { GLOBAL_URL_ROUTES } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";

interface SmallScreenNavMenuProps {
  onItemClick: (item: string) => void;
  className?: string;
}

const SmallScreenNavMenu: React.FC<SmallScreenNavMenuProps> = ({
  onItemClick,
  className,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const role = user?.role;
  const isOwnerOrStaff = role === "owner" || role === "staff";

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
      name: "Setting",
      key: "Item 6",
      icon: faCog,
      path: `${GLOBAL_URL_ROUTES.setting}`,
    },
  ];

  if (isOwnerOrStaff) {
    items.splice(2, 0, {
      name: "My Store",
      key: "Item 5",
      icon: faStore,
      path: `${GLOBAL_URL_ROUTES.storeManagement}`,
    });
  }

  const handleItemClick = (item: { key: string; path: string }) => {
    onItemClick(item.key);
    navigate(item.path);
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 space-x-5 p-1 gap-1 bg-bg shadow-lg flex text-white justify-around rounded-t-3xl ${className}`}
    >
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.key}
            className={`flex flex-col items-center btn bg-bg hover:bg-bg border-none ${
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

export default SmallScreenNavMenu;
