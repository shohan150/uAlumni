import { useReducer } from "react";
import { profileContext } from "../context";
import { initialState, profileReducer } from "../reducers/profileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <profileContext.Provider value={{ state, dispatch }}>
      {children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;
