import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";

import MyPosts from "../components/profile/MyPosts";
import ProfileInfo from "../components/profile/ProfileInfo";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  //main api http://localhost:3000. Ekhane amra hook use kore, checking er por, hook theke return kora api ta use korchi. Tahole lav ki holo? Ei api diye request korle tar interceptor deya ache, to token k update kore valide token rakhbe auth e sobsomoy. emnoki header eo valid token rakbe. Ekhn auth e notun/fresh/valid token ta ache. Ei valid token e server e request korar somoy pathano hobe request header e.

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
