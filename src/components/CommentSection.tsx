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
      <form className="max-w-2xl rounded-lg">
        <textarea
          placeholder="Comment..."
          className="w-full rounded-lg leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-600 focus:outline-none focus:bg-white bg-accent"
          defaultValue={""}
        />
        <div className="flex justify-end px-4">
          <input
            type="submit"
            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-primary cursor-pointer mt-1"
            defaultValue="Comment"
          />
        </div>
      </form>

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
