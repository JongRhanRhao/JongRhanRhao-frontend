const UpgradeToVIPCard = () => {
  return (
    <div className="p-4 bg-primary shadow-lg rounded-xl w-10/12 h-32 overflow-hidden max-w-8xl bg-pattern">
      <header className="text-secondary font-bold text-md text-left font-sans">
        Upgrade your account to VIP
      </header>
      <div className="flex justify-end mt-4">
        <button className="bg-secondary text-black text-sm font-bold px-2 py-1 rounded-md font-sans hover:text-accent2">
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default UpgradeToVIPCard;
