import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userinfo"))
  );

  useEffect(() => {
    const user = sessionStorage.getItem("userinfo");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};
