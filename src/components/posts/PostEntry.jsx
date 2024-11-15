import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    // Initialize FormData and append fields
    const data = new FormData();
    data.append("permission", formData.permission);
    data.append("content", formData.content);
    if (formData.image[0]) {
      data.append("image", formData.image[0]); // Appending only the first file
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        data, 
        { headers: { "Content-Type": "multipart/form-data" } } 
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(handlePostSubmit)} encType="multipart/form-data">
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>

              {/* wanted to categorize postes here. that public posts can be seen even if user not logged in. 'members' posts can only be seen by logged in users. but the server is developed in suach a way that it only gives posts if authToken is provided. so, that couldn't be achieved. to do that i would have to change the backend code. */}
              <select {...register("permission")} className="text-sm text-gray-200 bg-deepBg focus:border-none focus:outline-none w-20">
                <option value="public" className="bg-white text-textBlue font-semibold">Public</option>
                <option value="members" className="bg-white text-textBlue font-semibold">Members</option>
              </select>
            </div>
          </div>

          <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="photo">
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input {...register("image")} type="file" name="image" id="photo" className="hidden" />
        </div>

        <Field label="" error={errors.content}>
          <textarea
            {...register("content")}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none placeholder:text-gray-200/60 lg:h-[160px]"
          ></textarea>
        </Field>
        
        <div className="pt-4 lg:pt-6">
          <button
            className="auth-input bg-textBlue font-bold text-deepDark transition-all hover:-translate-y-[2px]"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
