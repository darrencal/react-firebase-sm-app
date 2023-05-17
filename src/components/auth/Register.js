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
import { DASHBOARD, LOGIN } from '../../routes';
import { useRegister } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/form-validation';

export default function Register() {
  const { register: signUp, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister({ username, email, password }) {
    signUp({ username, email, password, redirectTo: DASHBOARD });
  }

  return (
    <Center w='100%' h='100vh'>
      <Box mx='1' maxW='md' p='9' borderWidth='1px' borderRadius='lg'>
        <Heading mb='4' size='lg' textAlign='center'>
          Register
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py='2'>
            <FormLabel>Username</FormLabel>
            <Input type='username' {...register('username')}></Input>
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
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
            loadingText='Registering'
          >
            Register
          </Button>
        </form>

        <Text align='center' mt='6'>
          Already have an account?{' '}
          <Link
            as={RouterLink}
            to={LOGIN}
            color='teal.800'
            fontWeight='medium'
            textDecor='underline'
            _hover={{ background: 'teal.100' }}
          >
            Log In
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
