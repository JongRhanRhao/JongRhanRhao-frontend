import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const LinkBack = () => {
  return (
    <Link to="/">
      <div className="py-2 text-xl text-primary mb-4 font-bold flex items-center">
        <FontAwesomeIcon icon={faAngleLeft} />
        <span className="ml-2">Back</span>
      </div>
    </Link>
  );
};

export default LinkBack;
