import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD, REGISTER } from '../../routes';
import { useLogin } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/form-validation';

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleLogin({ email, password }) {
    const succeeded = await login({ email, password, redirectTo: DASHBOARD });

    if (succeeded) reset();
  }

  return (
    <Center w='100%' h='100vh'>
      <Box mx='1' maxW='md' p='9' borderWidth='1px' borderRadius='lg'>
        <Heading mb='4' size='lg' textAlign='center'>
          Log In
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormControl isInvalid={errors.email} py='2'>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='example@email.com'
              {...register('email', emailValidation)}
            ></Input>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py='2'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              {...register('password', passwordValidation)}
            ></Input>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            mt='4'
            colorScheme='teal'
            size='md'
            w='full'
            isLoading={isLoading}
            loadingText='Logging In'
          >
            Log In
          </Button>
        </form>

        <Text align='center' mt='6'>
          Don't have an account?{' '}
          <Link
            as={RouterLink}
            to={REGISTER}
            color='teal.800'
            fontWeight='medium'
            textDecor='underline'
            _hover={{ background: 'teal.100' }}
          >
            Register
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
