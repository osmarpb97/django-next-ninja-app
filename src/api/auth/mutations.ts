import { useMutation } from 'react-query';

import api from '@/api/api';

export const LogInMutation = () => {
  const mutation = useMutation<any, any>((event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    return api.post('/auth/', { email: email.value, password: password.value });
  });
  return mutation;
};
