import { useProfile } from "../../hooks/useProfile";
import PostList from "../posts/PostList";

const MyPosts = () => {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-2xl lg:mt-8 text-textBlue font-bold">Your Posts</h4>
      {
        posts?.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-gray-600 mt-4">You don&apos;t have any posts yet.</p>
        )
      }
    </>
  );
};

export default MyPosts;
