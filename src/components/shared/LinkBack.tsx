import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LinkBack = () => {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <div className="flex items-center py-2 mb-4 text-xl font-bold text-primary">
        <FontAwesomeIcon icon={faAngleLeft} />
        <span className="ml-2">{t("back")}</span>
      </div>
    </Link>
  );
};

export default LinkBack;
