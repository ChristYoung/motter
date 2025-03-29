'use client';

import { useUsersApi } from '@/feature/auth/hooks/useUsers';

const UserManagement: React.FC = () => {
  const { users, isLoading } = useUsersApi();
  return <div className='__page'>{JSON.stringify(users)}</div>;
};

export default UserManagement;
