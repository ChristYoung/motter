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
];

const UserManagement: React.FC = () => {
  const { users, isLoading } = useUsersApi();
  return (
    <div className='__page'>
      {users && users?.length > 0 && (
        <ReusableTable columns={columns} data={users as UserItem[]}></ReusableTable>
      )}
    </div>
  );
};

export default UserManagement;
