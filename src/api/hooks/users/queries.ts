import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../endpoints/users/users.api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAllUsers(),
  });
};
