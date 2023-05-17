import { Outlet, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../routes';
import { useAuth } from '../../hooks/auth';
import { useEffect } from 'react';
import Navbar from './Navbar';

export default function Layout() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(LOGIN);
    }
  }, [user]);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
