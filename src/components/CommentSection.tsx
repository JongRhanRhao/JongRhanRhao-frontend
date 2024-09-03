import { useParams } from "react-router-dom";

import CommentCard from "@/components/shared/CommentCard";
import { shopData } from "@/SampleData/data";

const CommentSection = () => {
  const { id } = useParams<{ id: string }>();
  const shopId = parseInt(id!);

  const shop = shopData[shopId] || {
    name: "Not Found",
    description: "Shop not found",
    comment: [],
  };

  return (
    // TODO: fix comment card style
    <div className="space-y-3">
      <form className="max-w-2xl rounded-lg">
        <textarea
          placeholder="Comment..."
          className="w-full text-black rounded-lg leading-normal resize-none py-2 px-3 font-medium placeholder-gray-600 focus:outline-none focus:bg-white bg-accent"
          defaultValue={""}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn rounded-md text-white bg-primary mt-1"
            defaultValue="Comment"
          >
            Comment
          </button>
        </div>
      </form>
      <div className="text-secondary text-xl font-medium">Comments</div>
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
