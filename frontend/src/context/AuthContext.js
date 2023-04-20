import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  myUserName: "",
  
  login: function (username) {
    this.myUserName = username
  },

  logout: () => {

  },
});
