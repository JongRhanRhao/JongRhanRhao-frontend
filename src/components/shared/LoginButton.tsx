import useModalStore from "@/hooks/useModalStore";
import { CUSTIOM_BUTTON_OUTLINE_CLASS } from "@/lib/variables";

const LoginButton = ({ className }: { className?: string }) => {
  const { openLoginModal } = useModalStore();
  return (
    <button
      className={`mt-4 ${className} ${CUSTIOM_BUTTON_OUTLINE_CLASS}`}
      onClick={(e) => {
        e.preventDefault();
        openLoginModal();
      }}
    >
      Log In / Sign Up
    </button>
  );
};

export default LoginButton;
