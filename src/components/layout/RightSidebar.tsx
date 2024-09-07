import {
  faAngleRight,
  faTicket,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import LoginButton from "@/components/shared/LoginButton";
import { useSidebarContext } from "@/contexts/SideBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@/contexts/UserContext";
import { clearUserData } from "@/utils/userUtils";

const RightSidebar = () => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarContext();

  const { setUser, user, isAuthenticated, setIsAuthenticated } = useUser();

  const handleLogout = () => {
    clearUserData();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        rightSidebarExpanded ? "w-64" : "w-12"
      } bg-accent text-white p-4 space-y-5`}
    >
      <button
        onClick={toggleRightSidebar}
        className={`text-xl text-secondary flex ${
          rightSidebarExpanded ? "justify-end" : "justify-center"
        }`}
      >
        <FontAwesomeIcon
          className={`hover:text-primary duration-150 btn btn-xs bg-accent border-none text-secondary ${
            rightSidebarExpanded && "text-primary"
          }`}
          icon={rightSidebarExpanded ? faX : faUser}
        />
      </button>
      {!isAuthenticated && rightSidebarExpanded && <LoginButton />}
      {user && rightSidebarExpanded && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{user.userName}</h2>
            <img
              src={user.userImage || "default-image-url"}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </div>
          <div className="font-semibold text-lg">Reservation Status</div>
          <div className="font-semibold text-lg">
            Status: <span className="text-success">Successfully reserved</span>{" "}
          </div>
          {isAuthenticated && (
            <div className="justify-end flex">
              <button
                onClick={handleLogout}
                className="w-full btn btn-outline btn-error text-secondary"
              >
                Logout
              </button>
            </div>
          )}
          <div className="h-px w-full bg-slate-200"></div>
          <button className="btn bg-primary text-secondary h-14">
            Check reservation
          </button>
          <button className="btn bg-secondary text-primary h-14 border-2 border-primary">
            <FontAwesomeIcon icon={faTicket} /> Have a coupon code?{" "}
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default RightSidebar;
