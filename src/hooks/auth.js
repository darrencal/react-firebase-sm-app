import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { COLLECTION_USERS, auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { DASHBOARD, LOGIN } from '../routes';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import checkUsernameExists from '../utils/check-username-exists';

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const ref = doc(db, COLLECTION_USERS, authUser.uid);
      const docSnapshot = await getDoc(ref);
      setUser(docSnapshot.data());
      setIsLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchUser();
      else setIsLoading(false);
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error };
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

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setIsLoading(true);

    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      toast({
        title: 'Username is already taken.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      setIsLoading(false);
    } else {
      try {
        // Create auth user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        // Create user profile
        await setDoc(doc(db, COLLECTION_USERS, res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: '',
          created: Date.now(),
        });

        toast({
          title: 'Account created!',
          description: 'Welcome to the app.',
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });

        navigate(redirectTo);
      } catch (error) {
        toast({
          title: 'Registration failed.',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast({
        title: 'Successfully signed out.',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });

      navigate(LOGIN);
    }
  }

  return { logout, isLoading };
}
