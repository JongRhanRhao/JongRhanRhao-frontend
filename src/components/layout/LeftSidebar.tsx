import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faStore,
  faHome,
  faAngleRight,
  faAngleLeft,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import UpgradeToVIPCard from "@/components/shared/UpgradeToVIPCard";
import { GLOBAL_URL_ROUTES } from "@/lib/variables";
import { useUser } from "@/hooks/useUserStore";
import { useSidebarStore } from "@/hooks/useSidebarStore";

interface LeftSidebarProps {
  onItemClick: (item: string) => void;
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  onItemClick,
  className,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leftSidebarExpanded, toggleLeftSidebar } = useSidebarStore();
  const { user } = useUser();
  const userRole = user?.role;
  const isOwnerOrStaff = userRole === "owner" || userRole === "staff";

  const items = [
    {
      name: "Discover",
      key: "Item1",
      icon: faHome,
      path: GLOBAL_URL_ROUTES.landingPage,
    },
    {
      name: "Status",
      key: "Item4",
      icon: faClock,
      path: GLOBAL_URL_ROUTES.reserveStatus,
    },
    {
      name: "Setting",
      key: "Item6",
      icon: faCog,
      path: GLOBAL_URL_ROUTES.setting,
    },
  ];

  if (isOwnerOrStaff) {
    items.splice(2, 0, {
      name: "My Store",
      key: "Item5",
      icon: faStore,
      path: GLOBAL_URL_ROUTES.storeManagement,
    });
  }

  const handleItemClick = (item: { key: string; path: string }) => {
    onItemClick(item.key);
    navigate(item.path);
  };

  return (
    <div
      className={
        `flex flex-col transition-all duration-300 ${
          leftSidebarExpanded ? "w-64" : "w-20"
        } bg-bg text-white p-4 hidden md:flex shadow-lg` + className
      }
    >
      <div className="flex justify-between items-center mb-8">
        {leftSidebarExpanded && (
          <h1 className="font-bold text-2xl text-primary">JongRhanRhao</h1>
        )}
        <button
          onClick={toggleLeftSidebar}
          className="btn btn-circle btn-sm bg-primary text-white hover:bg-primary-focus"
        >
          <FontAwesomeIcon
            icon={leftSidebarExpanded ? faAngleLeft : faAngleRight}
          />
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.key}>
                <button
                  className={`w-full btn btn-ghost justify-start ${
                    isActive ? "bg-primary text-white" : "hover:bg-primary/20"
                  } ${
                    leftSidebarExpanded ? "px-4" : "px-0"
                  } py-3 rounded-lg transition-colors duration-200`}
                  onClick={() => handleItemClick(item)}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`${leftSidebarExpanded ? "mr-3" : "mx-auto"}`}
                  />
                  {leftSidebarExpanded && <span>{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {leftSidebarExpanded && (
        <div className="mt-auto">
          <UpgradeToVIPCard />
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
