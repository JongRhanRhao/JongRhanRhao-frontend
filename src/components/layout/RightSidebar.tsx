import LoginButton from "@/components/LoginButton";
import { useSidebarContext } from "@/contexts/SideBarContext";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RightSidebar = () => {
  const { rightSidebarExpanded, toggleRightSidebar } = useSidebarContext();
  // const users = [
  //   {
  //     username: "Ton",
  //     userImage:
  //       "https://images.unsplash.com/photo-1688045303217-f44fec8d3fe1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        rightSidebarExpanded ? "w-64" : "w-20"
      } bg-accent text-white p-4 space-y-4`}
    >
      <button
        onClick={toggleRightSidebar}
        className={`text-xl text-secondary flex ${
          rightSidebarExpanded ? "justify-end" : "justify-center"
        }`}
      >
        <FontAwesomeIcon icon={rightSidebarExpanded ? faX : faBars} />
      </button>
      <LoginButton />
      {/* <div className="flex justify-between">
        <h2 className="text-xl">{users[0].username}</h2>
        <img
          src={users[0].userImage}
          className="w-10 h-10 rounded-full"
          alt="profile"
        />
      </div>
      <p>Reservation Status</p> */}
    </div>
  );
};

export default RightSidebar;
