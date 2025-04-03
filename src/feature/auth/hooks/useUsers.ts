import { useQuery } from 'convex/react';
import { useMutation } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';
import { DataModel, Id } from '../../../../convex/_generated/dataModel';

export const useUsersApi = () => {
  const users = useQuery(api.users.getUsers);
  const usersWithFuncs = users?.map((u) => ({ ...u, funcs: u.funcs?.code }));
  const isLoading = users === undefined;
  return { usersWithFuncs, isLoading };
};

export const useSetUserRoleApi = () => {
  const mutation = useMutation(api.users.setUserRole);
  const mutate = useCallback(
    async (userId: Id<'users'>, code: DataModel['funcs']['document']['code']) => {
      await mutation({ userId, code });
    },
    [mutation]
  );
  return { mutate };
};
