import { ReactNode } from 'react';

export interface IAuthContextProps {
  children: ReactNode;
}

export type userType = 'Administrator' | 'User';

export interface IAuthCreateContext {
  userToken?: string | null;
  userRole?: userType | null;
  userId?: string | null;
}
