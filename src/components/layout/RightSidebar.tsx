import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faAngleRight,
  // faTicket,
  faUser,
  faX,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import LoginButton from "@/components/shared/LoginButton";
import { useSidebarStore } from "@/hooks/useSidebarStore";
import { useUser } from "@/hooks/useUserStore";
import { useNavigate } from "react-router-dom";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className }) => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarStore();
  const { user, isAuthenticated, logout, initializeUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    async function initialize() {
      await initializeUser();
    }
    initialize();
  }, [initializeUser]);
  return (
    <div
      className={`flex flex-col transition-all duration-300 container ${
        rightSidebarExpanded ? "w-64" : "w-16"
      } bg-bg text-white p-4 shadow-lg ${className}`}
    >
      <button
        onClick={toggleRightSidebar}
        className="self-end mb-4 btn btn-circle btn-sm text-secondary bg-primary hover:bg-secondary hover:text-primary"
      >
        <FontAwesomeIcon icon={rightSidebarExpanded ? faX : faUser} />
      </button>

      {rightSidebarExpanded && (
        <div className="space-y-4">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <>
              <div className="container p-4 rounded-lg shadow-inner bg-bg2/50">
                <h2 className="mb-2 text-xl font-bold">{user?.userName}</h2>
                <div className="mb-5 text-sm uppercase opacity-50">
                  {user?.role}
                </div>
                {/* <div className="text-base opacity-75 text-text">
                  Reservation Status
                </div>
                <div className="font-semibold">
                  Status:{" "}
                  <span className="text-success">Successfully reserved</span>
                </div> */}
              </div>

              <button
                className="w-full btn btn-outline text-text"
                onClick={() => {
                  navigate("/reservations");
                  toggleRightSidebar();
                }}
              >
                Check Reservation
              </button>

              {/* <button className="w-full btn btn-outline text-text">
                <FontAwesomeIcon icon={faTicket} className="mr-2" />
                Have a coupon code?
                <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
              </button> */}

              <button
                onClick={handleLogout}
                className="w-full mt-auto btn btn-outline btn-error"
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
