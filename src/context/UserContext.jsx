import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const value = { setUser, user, isLogged, setIsLogged };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
