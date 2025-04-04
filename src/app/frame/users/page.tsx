'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ReusableTable } from '@/components/ReuseableTable';
import { Button } from '@/components/ui/button';
import { useSetUserRoleApi, useUsersApi } from '@/feature/auth/hooks/useUsers';
import { UserItem } from '@/types';

const columns: ColumnDef<UserItem>[] = [
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
  const { usersWithFuncs } = useUsersApi();
  const { mutate } = useSetUserRoleApi();

  return (
    <div className='__page h-full px-10'>
      {usersWithFuncs && usersWithFuncs?.length > 0 && (
        <ReusableTable columns={columns} data={usersWithFuncs as UserItem[]}></ReusableTable>
      )}
      <Button
        onClick={() => {
          if (usersWithFuncs && usersWithFuncs.length > 0) {
            mutate(usersWithFuncs[0]._id, 'ADMIN');
          }
        }}
      >
        Set Role
      </Button>
    </div>
  );
};

export default UserManagement;
