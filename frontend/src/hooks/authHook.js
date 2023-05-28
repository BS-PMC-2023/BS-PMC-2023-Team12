import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [email, SetEmail] = useState(null);

  const login = useCallback((uid, token, name, admin, email) => {
    setToken(token);
    setUserId(uid);
    setUserName(name);
    setAdmin(admin);
    SetEmail(email);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        name: name,
        admin: admin,
        email: email,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    SetEmail(null);
    setAdmin(false);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(
        storedData.userId,
        storedData.token,
        storedData.name,
        storedData.admin,
        storedData.email
      );
    }
  }, [login]);
  return { token, login, logout, userId, userName, isAdmin, email };
};
