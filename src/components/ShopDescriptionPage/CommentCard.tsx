import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const CommentCard = ({
  name,
  avatar,
  date,
  comment,
  rating,
}: {
  name: string;
  avatar: string;
  date: string;
  comment: string;
  rating: number;
}) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-sm px-6 py-4 shadow-lg bg-secondary rounded-xl">
      <div className="flex items-center mb-6">
        <div className="avatar">
          <div className="w-16 mr-4 rounded-full">
            <img src={avatar} />
          </div>
        </div>
        <div>
          <div className="font-medium text text-text">{name}</div>
        </div>
      </div>
      <p className="mb-6 leading-relaxed text-text">{comment}</p>
      <div className="flex items-center justify-between gap-8">
        <div className="text-text/50">
          {Array.from({ length: rating }).map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className="text-yellow-500"
            />
          ))}
        </div>
        <div className="text-sm text-text/50">
          {t("Reviewed on")} {format(date, "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
