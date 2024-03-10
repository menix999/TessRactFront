'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface IUser {
  token: string;
  userId: string;
}

interface IAuthContextProps {
  children: ReactNode;
}

type userType = 'Administrator' | 'User';

export interface IAuthCreateContext {
  userToken?: string | null;
  userRole?: userType | null;
  userId?: string | null;
}

export const AuthContext = createContext<IAuthCreateContext>({
  userToken: null,
  userRole: null,
  userId: null,
});

export const AuthProvider = ({ children }: IAuthContextProps) => {
  const [user, setUser] = useState<IAuthCreateContext>({
    userToken: null,
    userRole: null,
    userId: null,
  });

  useEffect(() => {
    const userToken = Cookies.get('userToken');
    const userRole = Cookies.get('userRole') as userType | null | undefined;
    const userId = Cookies.get('userId');

    console.log('userToken', userToken);
    setUser({
      userToken,
      userRole,
      userId,
    });

    return () => setUser({ userToken: null, userRole: null, userId: null });
  }, []);

  const setCookie = (cname: string, cvalue: string, exdays: number) => {
    Cookies.set(cname, cvalue, { expires: exdays });
  };

  const logout = () => {
    Cookies.remove('userToken');
    Cookies.remove('userRole');
    Cookies.remove('userId');

    setUser({ userToken: null, userRole: null, userId: null });
  };

  const login = (userToken: string, userRole: userType, userId: string) => {
    setCookie('userToken', userToken, 1);
    setCookie('userId', userId, 1);
    setCookie('userRole', userRole, 1);

    setUser({ userToken, userRole, userId });
  };

  const contextValue = useMemo(
    () => ({
      ...user,
      logout,
      login,
    }),
    [user]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
