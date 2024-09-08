const UpgradeToVIPCard = () => {
  return (
    <div className="flex justify-center">
      <div className="p-4 bg-primary shadow-lg rounded-xl w-10/12 h-32 overflow-hidden max-w-8xl bg-pattern">
        <header className="text-text font-bold text-md text-left font-sans">
          Upgrade your account to VIP
        </header>
        <div className="flex justify-end mt-4">
          <button className="bg-text text-bg text-sm font-bold px-2 py-1 rounded-md font-sans hover:text-slate-800">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToVIPCard;
