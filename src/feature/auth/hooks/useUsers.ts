import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

export const useUsersApi = () => {
  const users = useQuery(api.users.getUsers);
  const usersWithFuncs = users?.map((u) => ({ ...u, funcs: u.funcs?.code }));
  const isLoading = users === undefined;
  return { usersWithFuncs, isLoading };
};
