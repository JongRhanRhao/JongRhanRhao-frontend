import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faEnvelope,
  faFileInvoiceDollar,
  faCog,
  faStore,
  faBars,
  faX,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import { useSidebarContext } from "@/contexts/SideBarContext";
import UpgradeToVIPCard from "@/components/shared/UpgradeToVIPCard";

interface LeftSidebarProps {
  onItemClick: (item: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onItemClick }) => {
  const location = useLocation();
  const { leftSidebarExpanded, toggleLeftSidebar } = useSidebarContext();

  const items = [
    {
      name: "Dashboard",
      key: "Item 1",
      icon: faHome,
      path: "/dashboard",
    },
    { name: "Favorite", key: "Item 2", icon: faStar, path: "/favorite" },
    { name: "Message", key: "Item 3", icon: faEnvelope, path: "/message" },
    {
      name: "Status",
      key: "Item 4",
      icon: faFileInvoiceDollar,
      path: "/status",
    },
    { name: "My Store", key: "Item 5", icon: faStore, path: "/store" },
    { name: "Setting", key: "Item 6", icon: faCog, path: "/setting" },
  ];

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        leftSidebarExpanded ? "w-64" : "w-20"
      } bg-accent text-white p-4`}
    >
      <button
        onClick={toggleLeftSidebar}
        className={`text-xl text-secondary flex ${
          leftSidebarExpanded ? "justify-end" : "justify-center"
        }`}
      >
        <FontAwesomeIcon icon={leftSidebarExpanded ? faX : faBars} />
      </button>
      <div className="flex justify-between items-baseline">
        <Link
          to="/dashboard"
          className={`text-2xl font-bold font-sans mt-5 text-left ${
            leftSidebarExpanded ? "text-primary" : "hidden"
          }`}
        >
          JongRhanRhao
        </Link>
      </div>
      <div
        className={`mt-4  ${
          leftSidebarExpanded ? "" : "hidden"
        } text-md font-sans text-left space-y-4`}
      >
        <ul className="space-y-3">
          {items.map((item) => {
            const isSelectedMenuAndPathMatch = location.pathname === item.path;
            return (
              <li
                key={item.key}
                className={`cursor-pointer p-4 rounded-xl flex items-center space-x-2 ${
                  isSelectedMenuAndPathMatch ? "bg-primary" : ""
                }`}
                onClick={() => onItemClick(item.key)}
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 w-full"
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {leftSidebarExpanded && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
          <UpgradeToVIPCard />
        </ul>
      </div>
      {!leftSidebarExpanded && (
        <ul className="space-y-4 mt-8">
          {items.map((item) => {
            const isSelectedMenuAndPathMatch = location.pathname === item.path;
            return (
              <li
                key={item.key}
                className={`cursor-pointer p-4 rounded-xl flex items-center space-x-2 ${
                  isSelectedMenuAndPathMatch ? "bg-primary" : ""
                }`}
                onClick={() => onItemClick(item.key)}
              >
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 w-full"
                >
                  <FontAwesomeIcon icon={item.icon} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LeftSidebar;
