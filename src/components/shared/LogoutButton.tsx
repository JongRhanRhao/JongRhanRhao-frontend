import React from "react";
import toast from "react-hot-toast";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/hooks/useUserStore";

const LogoutButton = ({ className }: { className?: string }) => {
  const { logout } = useUserStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleLogout = async () => {
    try {
      await logout();
      setIsLogoutModalOpen(false);
      toast.success(t("Logged out successfully!"));
    } catch (error) {
      toast.error(t("Something went wrong. Please try again."));
    }
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };
  return (
    <>
      <button
        onClick={openLogoutModal}
        className={`mt-2 min-w-fit btn btn-outline btn-error ${className}`}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        {t("Logout")}
      </button>
      <dialog
        id="logout_modal"
        className={`modal ${isLogoutModalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="border-2 shadow-lg modal-box bg-bg border-secondary/70"
        >
          <h3 className="text-lg font-bold text-primary">
            {t("Confirm Logout")}
          </h3>
          <p className="py-4">{t("Are you sure you want to log out?")}</p>
          <div className="modal-action">
            <button
              className="btn text-text bg-secondary"
              onClick={closeLogoutModal}
            >
              {t("Cancel")}
            </button>
            <button className="btn btn-error" onClick={handleLogout}>
              {t("Logout")}
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeLogoutModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default LogoutButton;
