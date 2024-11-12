import { useProfile } from "../../hooks/useProfile";
import PostList from "../posts/PostList";

const MyPosts = () => {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-2xl lg:mt-8 text-textBlue font-bold">Your Posts</h4>
      <PostList posts={posts} />
    </>
  );
};

export default MyPosts;
