import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEnvelope,
  faCog,
  faStore,
  faHome,
  faAngleRight,
  faAngleLeft,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { useSidebarContext } from "@/contexts/SideBarContext";
import UpgradeToVIPCard from "@/components/shared/UpgradeToVIPCard";
import { GLOBAL_URL_ROUTES } from "@/lib/helpers/environment";

interface LeftSidebarProps {
  onItemClick: (item: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leftSidebarExpanded, toggleLeftSidebar } = useSidebarContext();
  // const [isExpanded, setIsExpanded] = useState(false);
  const expandTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const renderItems = (expanded: boolean) => (
    <ul className={`space-y-4 ${expanded ? "mt-4" : "mt-8"}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <li
            key={item.key}
            className={`btn bg-bg2 text-text border-none cursor-pointer font-bold p-4 rounded-xl flex items-center space-x-2 duration-150 justify-start 
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
      // setIsExpanded(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (expandTimeout.current) {
      clearTimeout(expandTimeout.current);
    }
    // setIsExpanded(false);
  };

  // if you want to change the sidebar to expand on hover instead of click event change leftSidebarExpanded to isExpanded
  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        leftSidebarExpanded ? "w-64" : "w-20"
      } bg-bg2 text-white p-4 hidden md:block lg:block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {leftSidebarExpanded && (
        <div className="flex justify-end">
          <button
            onClick={toggleLeftSidebar}
            className={`btn text-xl duration-300 shadow-lg text-text bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl w-12 mt-2`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
      )}
      {!leftSidebarExpanded && (
        <div
          onClick={toggleLeftSidebar}
          className={`btn w-12 text-text text-center text-2xl shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl mt-2`}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
      {leftSidebarExpanded && (
        <div className=" font-bold font-sans text-center text-2xl text-text rounded-xl py-4">
          JongRhanRhao
        </div>
      )}
      {renderItems(leftSidebarExpanded)}
    </div>
  );
};

export default LeftSidebar;
