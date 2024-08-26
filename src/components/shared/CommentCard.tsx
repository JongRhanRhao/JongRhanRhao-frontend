const CommentCard = ({
  name,
  avatar,
  date,
  likes,
  comment,
  replies,
}: {
  name: string;
  avatar: string;
  date: string;
  likes: number;
  comment: string;
  replies: number;
}) => {
  return (
    <div className="max-w-xl px-6 py-4 rounded-lg bg-accent h-auto">
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="text-lg font-medium text-white">{name}</div>
          <div className="text-gray-500">{date}</div>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-6 text-white">{comment}</p>
      <div className="flex justify-between items-center">
        <div className="flex justify-between">
          <a href="#" className="text-gray-500 hover:text-primary mr-4">
            <i className="far fa-thumbs-up" /> {likes}
            <i className="far fa-thumbs-up" /> Like
          </a>
          <a href="#" className="text-gray-500 hover:text-primary">
            <i className="far fa-comment-alt" /> {replies}
            <i className="far fa-comment-alt" /> Reply
          </a>
        </div>
        {/* <div className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-primary mr-4">
              <i className="far fa-flag" /> Report
            </a>
            <a href="#" className="text-gray-500 hover:text-primary">
              <i className="far fa-share-square" /> Share
            </a>
          </div> */}
      </div>
    </div>
  );
};

export default CommentCard;
