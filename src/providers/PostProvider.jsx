import { useReducer } from "react";
import { postContext } from "../context";
import { initialState, postReducer } from "../reducers/postReducer";

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <postContext.Provider value={{ state, dispatch }}>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
