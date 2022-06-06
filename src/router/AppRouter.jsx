import { useEffect } from 'react';
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <div className='loader'></div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <PublicRoute isAuth={!!uid}>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute isAuth={!!uid}>
                <CalendarScreen />
              </PrivateRoute>
            }
          />

          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
