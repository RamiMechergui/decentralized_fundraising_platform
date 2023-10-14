import { FC, useRef, useEffect, useState } from 'react';
import { shallowEqual, useSelector, connect, useDispatch, ConnectedProps } from 'react-redux';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';
import * as auth from './AuthRedux';
import { getUserByToken, logout } from './AuthCRUD';
import { RootState } from '../../../../setup';
import { useHistory } from 'react-router-dom';

const mapState = (state: RootState) => ({
  auth: state.auth,
});

const mapDispatch = {
  fulfillUser: auth.actions.fulfillUser,
  logout: auth.actions.logout,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = ({ fulfillUser, logout, children }) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const accessToken = useSelector<RootState, string | undefined>(
    (state) => state.auth.accessToken,
    shallowEqual
  );
  const history = useHistory();

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data: user } = await getUserByToken();
          fulfillUser(user);
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };

    if (accessToken) {
      requestUser();
    } else {
      logout();
      setShowSplashScreen(false);
      history.push('/auth/login');
    }

    return () => {
      didRequest.current = true;
    };
  }, [accessToken, fulfillUser, logout, history]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export default connector(AuthInit);
