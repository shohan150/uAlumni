import { useEffect, useState } from "react";
import { authContext } from "../context";
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('ualumni-authInfo');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    localStorage.setItem('ualumni-authInfo', JSON.stringify(auth));
  }, [auth]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
