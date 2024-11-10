import { useContext } from "react";
import { profileContext } from "../context";

export const useProfile = () => {
  //subidha etuk e j barbar useContext likha lagbe na. Directly hook use kore state, dispatch k access korte parbo.
  return useContext(profileContext);
};
