import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTicket,
  faUser,
  faX,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import LoginButton from "@/components/shared/LoginButton";
import { useSidebarContext } from "@/contexts/SideBarContext";
import { useUser } from "@/contexts/UserContext";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className }) => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarContext();
  const { user, isAuthenticated, logout } = useUser();

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        rightSidebarExpanded ? "w-64" : "w-16"
      } bg-bg text-white p-4 shadow-lg ${className}`}
    >
      <button
        onClick={toggleRightSidebar}
        className="btn btn-circle btn-sm bg-primary text-white hover:bg-primary-focus self-end mb-4"
      >
        <FontAwesomeIcon icon={rightSidebarExpanded ? faX : faUser} />
      </button>

      {rightSidebarExpanded && (
        <div className="space-y-4">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <>
              <div className="bg-bg2/50 rounded-lg p-4 shadow-inner">
                <h2 className="text-xl font-bold mb-2">{user?.userName}</h2>
                <div className="text-sm opacity-75">Reservation Status</div>
                <div className="font-semibold">
                  Status:{" "}
                  <span className="text-success">Successfully reserved</span>
                </div>
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  /* Handle reservation check */
                }}
              >
                Check Reservation
              </button>

              <button className="btn btn-outline btn-primary w-full">
                <FontAwesomeIcon icon={faTicket} className="mr-2" />
                Have a coupon code?
                <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
              </button>

              <button
                onClick={logout}
                className="btn btn-outline btn-error w-full mt-auto"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
