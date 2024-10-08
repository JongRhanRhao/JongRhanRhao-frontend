import React, { useEffect } from "react";
// import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faAngleRight,
  // faTicket,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useSidebarStore } from "@/hooks/useSidebarStore";
import { useUser } from "@/hooks/useUserStore";
import LoginButton from "@/components/shared/LoginButton";
import { CUSTIOM_BUTTON_OUTLINE_CLASS } from "@/lib/variables";
import LogoutButton from "@/components/shared/LogoutButton";
// import { SERVER_URL } from "@/lib/variables";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ className }) => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarStore();
  const { user, isAuthenticated, initializeUser } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        {rightSidebarExpanded ? (
          <FontAwesomeIcon icon={faX} />
        ) : user?.profilePicture ? (
          <div className="size-10 avatar">
            <div className="w-24 rounded-full ring-primary ring-2 ring-offset-base-100 ring-offset-2 hover:ring-primary/70 duration-150">
              <img src={user?.profilePicture} />
            </div>
          </div>
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </button>

      {rightSidebarExpanded && (
        <div className="space-y-4">
          {!isAuthenticated ? (
            <LoginButton className="w-full" />
          ) : (
            <>
              <div className="p-4 rounded-lg shadow-inner bg-bg2/50">
                <div className="flex items-center">
                  <h2 className="mb-2 text-xl font-bold">{user?.userName}</h2>
                  <div className="ml-2 size-14 avatar">
                    <div className="w-24 rounded-full">
                      <img src={user?.profilePicture} />
                    </div>
                  </div>
                </div>
                <div className="mb-5 text-sm uppercase opacity-50">
                  {t(user?.role || "user")}
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
                className={`w-full ${CUSTIOM_BUTTON_OUTLINE_CLASS}`}
                onClick={() => {
                  navigate("/reservations");
                  toggleRightSidebar();
                }}
              >
                {t("Check Reservation")}
              </button>
              <button
                className="w-full btn btn-outline text-text"
                onClick={() => {
                  navigate("/profile");
                  toggleRightSidebar();
                }}
              >
                {t("Profile Settings")}
              </button>
              <LogoutButton className="w-full" />
              <button
                onClick={() => {
                  navigate("/feedback");
                  toggleRightSidebar();
                }}
                className="w-full text-sm text-center cursor-pointer text-text/50 hover:text-text duration-150"
              >
                {t("Have feedback?")}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
