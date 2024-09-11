import { useParams } from "react-router-dom";

import CommentCard from "@/components/ShopDescriptionPage/CommentCard";
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
          className="w-full px-3 py-2 font-medium leading-normal text-black placeholder-gray-600 rounded-lg resize-none focus:outline-none focus:bg-white"
          defaultValue={""}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-1 btn rounded-xl text-secondary bg-primary hover:bg-secondary hover:text-primary"
            defaultValue="Comment"
          >
            Comment
          </button>
        </div>
      </form>
      <div className="text-xl font-medium text-text">Comments</div>
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
