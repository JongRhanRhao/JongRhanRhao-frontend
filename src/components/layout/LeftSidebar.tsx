import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faStar,
  faEnvelope,
  faFileInvoiceDollar,
  faCog,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface LeftSidebarProps {
  selectedItem: string;
  onItemClick: (item: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedItem,
  onItemClick,
}) => {
  const items = [
    { name: "Dashboard", key: "Item 1", icon: faTachometerAlt },
    { name: "Favorite", key: "Item 2", icon: faStar },
    { name: "Message", key: "Item 3", icon: faEnvelope },
    { name: "Status", key: "Item 4", icon: faFileInvoiceDollar },
    { name: "My Store", key: "Item 5", icon: faStore },
    { name: "Setting", key: "Item 6", icon: faCog },
  ];

  return (
    <div className="w-64 bg-accent text-white p-4 text-center flex flex-col">
      <h2 className="text-3xl text-primary font-bold font-sans mt-5 text-left">
        ChongRanNai
      </h2>
      <ul className="mt-4 text-md font-sans text-left space-y-4">
        {items.map((item) => (
          <li
            key={item.key}
            className={classNames(
              "cursor-pointer p-4 rounded-xl flex items-center space-x-2",
              {
                "bg-primary": selectedItem === item.key,
              }
            )}
            onClick={() => onItemClick(item.key)}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
