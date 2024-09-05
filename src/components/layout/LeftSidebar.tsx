import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileInvoiceDollar,
  faCog,
  faStore,
  faHome,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useSidebarContext } from "@/contexts/SideBarContext";
import UpgradeToVIPCard from "@/components/shared/UpgradeToVIPCard";

interface LeftSidebarProps {
  onItemClick: (item: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leftSidebarExpanded, toggleLeftSidebar } = useSidebarContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandTimeout = useRef<NodeJS.Timeout | null>(null);

  const items = [
    { name: "Discover", key: "Item 1", icon: faHome, path: "/" },
    // { name: "Favorite", key: "Item 2", icon: faStar, path: "/favorite" },
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

  const handleItemClick = (item: { key: string; path: string }) => {
    onItemClick(item.key);
    navigate(item.path);
  };

  const renderItems = (expanded: boolean) => (
    <ul className={`space-y-4 ${expanded ? "mt-4" : "mt-8"}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <li
            key={item.key}
            className={`btn bg-accent border-none cursor-pointer font-bold p-4 rounded-xl flex items-center space-x-2 duration-150 
              ${isActive ? "bg-primary" : "hover:text-primary"}`}
            onClick={() => handleItemClick(item)}
          >
            <FontAwesomeIcon icon={item.icon} />
            {expanded && <span>{item.name}</span>}
          </li>
        );
      })}
      {expanded && <UpgradeToVIPCard />}
    </ul>
  );

  const handleMouseEnter = () => {
    expandTimeout.current = setTimeout(() => {
      setIsExpanded(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (expandTimeout.current) {
      clearTimeout(expandTimeout.current);
    }
    setIsExpanded(false);
  };

  // if you want to change the sidebar to expand on hover instead of click event change leftSidebarExpanded to isExpanded
  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        leftSidebarExpanded ? "w-64" : "w-20"
      } bg-accent text-white p-4 hidden md:block lg:block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {leftSidebarExpanded && (
        <div className="flex justify-end">
          <button
            onClick={toggleLeftSidebar}
            className={`btn text-xl duration-300 shadow-lg text-secondary bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl w-12 mt-2`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
      )}
      {!leftSidebarExpanded && (
        <div
          onClick={toggleLeftSidebar}
          className="btn w-12 text-secondary text-center text-2xl shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl mt-2"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
      {leftSidebarExpanded && (
        <div className="text-3xl font-bold font-sans text-left text-white underline underline-offset-4 rounded-xl p-4 decoration-primary">
          JongRhanRhao
        </div>
      )}
      {renderItems(leftSidebarExpanded)}
    </div>
  );
};

export default LeftSidebar;
