import { createContext } from 'react';

const AuthContext = createContext({
  loginData: undefined,
  login: () => { },
  logout: () => { }
});

export default AuthContext;