'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ReusableTable } from '@/components/ReuseableTable';
import { useUsersApi } from '@/feature/auth/hooks/useUsers';
import { UserItem } from '@/types';

export const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: 'name',
    header: 'User Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: '_creationTime',
    header: 'Registration Time',
  },
  {
    accessorKey: 'funcs',
    header: 'Role',
  },
];

const UserManagement: React.FC = () => {
  const { usersWithFuncs, isLoading } = useUsersApi();

  return (
    <div className='__page h-full px-10'>
      {usersWithFuncs && usersWithFuncs?.length > 0 && (
        <ReusableTable columns={columns} data={usersWithFuncs as UserItem[]}></ReusableTable>
      )}
    </div>
  );
};

export default UserManagement;
