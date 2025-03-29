import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

export const useUsersApi = () => {
  const users = useQuery(api.users.getUsers);
  const isLoading = users === undefined;
  return { users, isLoading };
};
