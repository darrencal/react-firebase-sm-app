export const emailValidation = {
  required: {
    value: true,
    message: 'Please enter an email address.',
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email address is not valid.',
  },
};

export const passwordValidation = {
  required: {
    value: true,
    message: 'Please enter a password.',
  },
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters long.',
  },
};
