import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '@lib/apollo';
import { GetUsers } from '@lib/gql/queries';

import { PublicLayout } from '@templates/Layout';
import { UsersManager } from '@templates/UsersManager';
import useUser from '@lib/use-user';
import { useRouter } from 'next/router';

function Users() {
  const { loggedOut } = useUser();
  const router = useRouter();
  const { data, loading } = useQuery(GetUsers);

  if (loggedOut) {
    router.push('/');
    return null;
  }

  const users = data?.users || [];

  return (
    <PublicLayout loading={loading}>
      <UsersManager users={users} />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Users);
