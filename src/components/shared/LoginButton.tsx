import { useTranslation } from "react-i18next";

import useModalStore from "@/hooks/useModalStore";
import { CUSTOM_BUTTON_CLASS } from "@/lib/variables";

const LoginButton = ({ className }: { className?: string }) => {
  const { openLoginModal } = useModalStore();
  const { t } = useTranslation();
  return (
    <button
      className={`${className} ${CUSTOM_BUTTON_CLASS}`}
      onClick={(e) => {
        e.preventDefault();
        openLoginModal();
      }}
    >
      {t("Log In / Sign Up")}
    </button>
  );
};

export default LoginButton;
