import { createContext, useState } from 'react';
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated] = useState(JSON.parse(localStorage.getItem('token')) || '');

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
