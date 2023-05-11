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
import { REGISTER } from '../../routes';

export default function Login() {
  return (
    <Center w='100%' h='100vh'>
      <Box mx='1' maxW='md' p='9' borderWidth='1px' borderRadius='lg'>
        <Heading mb='4' size='lg' textAlign='center'>
          Log In
        </Heading>

        <form onSubmit={() => {}}>
          <FormControl isInvalid={true} py='2'>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='example@email.com'></Input>
            <FormErrorMessage>This is an error</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={true} py='2'>
            <FormLabel>Password</FormLabel>
            <Input type='password'></Input>
            <FormErrorMessage>This is an error</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            mt='4'
            colorScheme='teal'
            size='md'
            w='full'
            isLoading={true}
            loadingText='Logging In'
          >
            Log In
          </Button>
        </form>

        <Text fontSize='xl' align='center' mt='6'>
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
