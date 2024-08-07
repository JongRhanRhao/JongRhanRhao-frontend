const RightSidebar = () => {
  const users = [
    {
      username: "Ton",
      userImage:
        "https://images.unsplash.com/photo-1688045303217-f44fec8d3fe1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="w-64 bg-accent text-white p-4">
      <div className="flex justify-between">
        <h2 className="text-xl">{users[0].username}</h2>
        <img src={users[0].userImage} className="w-10 h-10" alt="profile" />
      </div>
    </div>
  );
};

export default RightSidebar;
