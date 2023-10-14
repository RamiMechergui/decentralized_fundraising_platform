import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as auth from './redux/AuthRedux';

export function Logout() {
  const dispatch = useDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const handleLogout = () => {
      dispatch(auth.actions.logout());
      setIsLoggedOut(true);
      localStorage.setItem('logout', 'true');
    };

    handleLogout();
  }, [dispatch]);

  useEffect(() => {
    const checkIfLoggedOut = () => {
      const logoutState = localStorage.getItem('logout');
      if (logoutState === 'true') {
        setIsLoggedOut(true);
      }
    };

    checkIfLoggedOut();
  }, []);

  if (isLoggedOut) {
    localStorage.removeItem('logout');
    return <Redirect to="/auth/login" />;
  }

  return null;
}
