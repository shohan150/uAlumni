import { useState } from "react";

import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";

import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";

import { usePost } from "../../hooks/usePost";

import { actions } from "../../actions";

import useAxios from "../../hooks/useAxios";

const PostHeader = ({ post }) => {
  const [showAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const isMe = post?.author?.id == auth?.user?.id;
  const { dispatch } = usePost();
  const { api } = useAxios();

  function toggleAction() {
    setShowAction(!showAction);
  }

  const handleDeletePost = async (event) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full">
        <img
          className="w-10 h-10 rounded-full lg:h-12 lg:w-12"
          src={avatarURL }
          alt="avatar"
        />
        <div className="flex-1">
          <h6 className="text-lg lg:text-xl">{post?.author?.name} {" "}
            {
              post?.author?.batchNo && <span className="text-lightBg text-sm">(Batch {`${post?.author?.batchNo}`})</span>
            }
             </h6>
          <div className="flex items-center justify-between text-xs">
            <h6 className="">{ post?.author?.desg && `${post?.author?.desg}`} </h6>
            <div className="flex items-center gap-1.5">
              <img src={TimeIcon} alt="time" />
              <span className="text-sm text-textBlue ">Posted {`${getDateDifferenceFromNow(
                post?.createAt
              )} ago`}</span>
              <span className="text-sm text-textBlue capitalize">({post?.permission})</span>
            </div>
          </div>

        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-textBlue">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={handleDeletePost}
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
