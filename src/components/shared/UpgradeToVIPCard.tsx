const UpgradeToVIPCard = () => {
  return (
    <div className="flex">
      <div className="w-10/12 h-32 p-4 overflow-hidden shadow-lg bg-primary rounded-xl max-w-8xl bg-pattern">
        <header className="font-sans font-bold text-left text-secondary text-md">
          Upgrade your account to VIP
        </header>
        <div className="flex justify-end mt-4">
          <button className="px-2 py-1 font-sans text-sm font-bold rounded-md bg-text text-bg hover:text-slate-800">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeToVIPCard;
