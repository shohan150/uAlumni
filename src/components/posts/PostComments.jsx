import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import PostCommentList from "./PostCommentList";


const PostComments = ({ post }) => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const { api } = useAxios();

  const imgUrl = state?.user?.avatar ?? auth?.user?.avatar;

  const addComment = async (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 rounded-full lg:h-[34px] lg:w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${imgUrl}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs text-textBlue focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComment(e)}
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="text-gray-200 max-md:text-sm" onClick={() => setShowAllComments(!showAllComments)}>
          {comments?.length > 3 ? showAllComments ? "All Comments" : "Show All Comments" : "All Comments"}
        </button>
      </div>

      <PostCommentList comments={comments} showAllComments={showAllComments} />
    </div>
  );
};

export default PostComments;
