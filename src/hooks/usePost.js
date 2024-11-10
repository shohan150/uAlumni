import { useContext } from "react";
import { postContext } from "../context";

export const usePost = () => {
  //all this does this, instead of inporting useContext again and again. now, you get the result using hook directly.
  return useContext(postContext);
};
