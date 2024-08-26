import CommentCard from "@/components/shared/CommentCard";
import { shopData } from "@/SampleData/data";
import { useParams } from "react-router-dom";

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = parseInt(id!);

  const shop = shopData[shopId] || {
    name: "Not Found",
    description: "Shop not found",
    comment: [],
  };

  return (
    <div className="space-y-3">
      <h2 className="text-secondary text-xl font-medium">Comments</h2>
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
        <p className="text-white">ยังไม่มีความคิดเห็นสำหรับร้านนี้</p>
      )}
    </div>
  );
};

export default CommentSection;
