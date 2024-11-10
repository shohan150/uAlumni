import { useContext, useDebugValue } from "react";
import { authContext } from "../context";

export const useAuth = () => {
  //subidha etuk e j barbar useContext likha lagbe na. Jehetu auth state er value sokol protected page ei lagbe to useContext call na kore directly hook call kore state take access korte parbo.
  //sekhan theke {auth} k neya holo karon tar upor useDebugValue use korte hobe.
  const { auth } = useContext(authContext);
  //one of the 7 seven additonal react hooks taught in the course. If we are using a hook every once in a while and want to check if it is operating properly, we can use the useDebugValue hook. jodi kono problem hoi, amra ekhane ei hook use kore ber korte parbo j user ki logged in naki out. first parameter e nei j kar upor eta active ba operate korbe r 2nd paramter e ekta function j ki debug message deya hobe ba return kora hobe seta decide korbe.
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(authContext);
};
