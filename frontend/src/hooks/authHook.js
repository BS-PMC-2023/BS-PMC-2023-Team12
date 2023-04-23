import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const login = useCallback((uid, token, name, admin) => {
    setToken(token);
    setUserId(uid);
    setUserName(name);
    setAdmin(admin);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        name: name,
        admin: admin,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);
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
        storedData.admin
      );
    }
  }, [login]);
  return { token, login, logout, userId, userName, isAdmin };
};
