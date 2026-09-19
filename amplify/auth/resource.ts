import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    'custom:role': {
      dataType: 'String',
      mutable: false,
      minLen: 1,
      maxLen: 10,
    },
  },
});
