import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CommentCard from "@/components/ShopDescriptionPage/CommentCard";
import { shopData } from "@/SampleData/data";

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = parseInt(id!);
  const { t } = useTranslation();

  const shop = shopData[shopId] || {
    name: "Not Found",
    description: "Shop not found",
    comment: [],
  };

  return (
    // TODO: fix comment card style
    <div className="space-y-3">
      <div className="text-xl font-medium text-text">{t("Comments")}</div>
      {shop.comment && shop.comment.length > 0 ? (
        shop.comment.map((comment, index) => (
          <CommentCard
            key={index}
            name={comment.name}
            avatar={comment.avatar}
            date={comment.date}
            likes={comment.likes}
            comment={comment.comment}
            replies={comment.replies}
          />
        ))
      ) : (
        <p className="text-white">{t('noComment')}</p>
      )}
    </div>
  );
};

export default CommentSection;
