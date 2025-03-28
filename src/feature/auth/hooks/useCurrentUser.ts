import { useQuery } from 'convex/react';

import { api } from '../../../../convex/_generated/api';

export const useCurrentUser = () => {
  const userInfo = useQuery(api.users.current);
  const isLoading = userInfo === undefined;
  return { userInfo, isLoading };
};
