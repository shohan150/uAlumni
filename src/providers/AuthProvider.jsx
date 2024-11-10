import { useState } from "react";
import { authContext } from "../context";
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
