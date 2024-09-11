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
    <div className="max-w-lg px-6 py-4 rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 mr-4 rounded-full"
        />
        <div>
          <div className="text-lg font-medium text-white">{name}</div>
          <div className="text-gray-500">{date}</div>
        </div>
      </div>
      <p className="mb-6 text-lg leading-relaxed text-white">{comment}</p>
      <div className="flex items-center justify-between">
        <div className="flex justify-between">
          <a href="#" className="mr-4 text-gray-500 hover:text-primary">
            <i className="far fa-thumbs-up" /> {likes}
            <i className="far fa-thumbs-up" /> Like
          </a>
          <a href="#" className="text-gray-500 hover:text-primary">
            <i className="far fa-comment-alt" /> {replies}
            <i className="far fa-comment-alt" /> Reply
          </a>
        </div>
        {/* <div className="flex items-center">
            <a href="#" className="mr-4 text-gray-500 hover:text-primary">
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
