import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import { DASHBOARD } from '../routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [authUser, isLoading, error] = useAuthState(auth);

  return { user: authUser, isLoading, error };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast({
        title: 'You are logged in!',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      navigate(redirectTo);
    } catch (error) {
      toast({
        title: 'Failed to log in.',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setIsLoading(false);
      return false; // Login failed
    }

    setIsLoading(false);
    return true; // Login succeeded
  }

  return { login, isLoading };
}
