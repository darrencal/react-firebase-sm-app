import { Outlet, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../routes';
import { useAuth } from '../../hooks/auth';
import { useEffect } from 'react';

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
    <div>
      Layout <Outlet />
    </div>
  );
}
