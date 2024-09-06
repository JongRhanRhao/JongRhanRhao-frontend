import { useState } from "react";
import {
  faAngleRight,
  faTicket,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import LoginButton from "@/components/shared/LoginButton";
import { useSidebarContext } from "@/contexts/SideBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// TODO: Implement RightSidebar component ( use user profile icon to be displayed on the right sidebar )
const RightSidebar = () => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarContext();
  const [isLogin, setIsLogin] = useState(false);
  const users = [
    {
      username: "Ton",
      userImage:
        "https://images.unsplash.com/photo-1688045303217-f44fec8d3fe1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
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
      {!isLogin && rightSidebarExpanded && <LoginButton />}
      {!isLogin && rightSidebarExpanded && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{users[0].username}</h2>
            <img
              src={users[0].userImage}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </div>
          <div className="font-semibold text-lg">Reservation Status</div>
          <div className="font-semibold text-lg">
            Status: <span className="text-success">Successfully reserved</span>{" "}
          </div>
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
