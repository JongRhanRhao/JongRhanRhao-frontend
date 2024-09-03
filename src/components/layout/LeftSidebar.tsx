import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

// import { useSidebarContext } from "@/contexts/SideBarContext";
import UpgradeToVIPCard from "@/components/shared/UpgradeToVIPCard";

interface LeftSidebarProps {
  onItemClick: (item: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { leftSidebarExpanded, toggleLeftSidebar } = useSidebarContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandTimeout = useRef<NodeJS.Timeout | null>(null);

  const items = [
    { name: "Discovery", key: "Item 1", icon: faHome, path: "/" },
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
            className={`cursor-pointer p-4 rounded-xl flex items-center space-x-2 duration-150 
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

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } bg-accent text-white p-4`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        // onClick={toggleLeftSidebar}
        className={`text-xl flex hover:text-primary duration-300 ${
          isExpanded
            ? "justify-end text-primary"
            : "justify-center text-secondary"
        }`}
      >
        <FontAwesomeIcon icon={isExpanded ? faX : faBars} />
      </button>
      {isExpanded && (
        <div className="text-2xl font-bold font-sans text-left text-primary mt-4">
          JongRhanRhao
        </div>
      )}
      {renderItems(isExpanded)}
    </div>
  );
};

export default LeftSidebar;
