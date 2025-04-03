import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

export const useCurrentUser = () => {
  const userInfo = useQuery(api.users.current);
  const isLoading = userInfo === undefined;
  return { userInfo, isLoading };
};

export const useCurrentUserFuncs = () => {
  const userFuncs = useQuery(api.users.getUserFuncs);
  const isLoading = userFuncs === undefined;
  return { userFuncs, isLoading };
};
