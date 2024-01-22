import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const defaultValue =
    localStorage.getItem('token') || JSON.stringify({ token: null });
  const [user, setUser] = useState(defaultValue);
  const setInformationUser = () => {
    // alert("llamado a la funcion")
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  const isAuthenticated = () => user.token;
  return (
    <AuthContext.Provider
      value={{ user, setUser, setInformationUser, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
