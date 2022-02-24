import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { PublicLayout } from '@templates/Layout';
import { UserEditForm } from '@organisms/UserEditForm';
import { withApollo } from '@lib/apollo';
import useUser from '@lib/use-user';

const Signup = () => {
  const { user, loggedOut, loading, mutate } = useUser();
  const router = useRouter();
  if (loggedOut) {
    router.push('/');
    return null;
  }

  return (
    <PublicLayout loading={loading}>
      <h2>Profile</h2>
      {user && <UserEditForm user={user} onSubmit={() => mutate()}></UserEditForm>}
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Signup);
