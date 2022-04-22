/* /context/AppContext.js */

import React, { useContext, useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/';

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = React.createContext({
  user: null as any,
  setUser: (value: any) => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const { user, setUser } = useContext(AppContext);
  return { user, setUser, isAuthenticated: !!user };
};

export const AppProvider = ({ children }: any ) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const token = Cookie.get('token');

    if (!token) return;
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.log('not ok')
      Cookie.remove('token');
      setUser(null);
      return;
    }

    const user = await response.json();
    setUser(user);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
