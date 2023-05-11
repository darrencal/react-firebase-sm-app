import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

export default function Login() {
  return (
    <Center w='100%' h='100vh'>
      <Box mx='1' maxW='md' p='9' borderWidth='1px' borderRadius='lg'>
        <Heading mb='4' size='lg' textAlign='center'>
          Log In
        </Heading>

        <form onSubmit={() => {}}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='email' placeholder='example@email.com'></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password'></Input>
          </FormControl>
          <Button type='submit' mt='4' colorScheme='teal' size='md' w='full'>
            Log In
          </Button>
        </form>
      </Box>
    </Center>
  );
}
