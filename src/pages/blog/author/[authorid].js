import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';
import { useRouter } from 'next/router';
import { BlogList } from '@organisms/BlogList';
import { useQuery } from '@apollo/react-hooks';
import { GetPostsByAuthor } from '@lib/gql/queries';
import useUser from '@lib/use-user';

const PostsByAuthor = () => {
  const router = useRouter();
  const { loggedOut } = useUser();
  if (loggedOut) {
    router.push('/');
  }

  const { authorid } = router.query;
  const { data, loading } = useQuery(GetPostsByAuthor, { variables: { id: { equals: authorid } } });

  return (
    <PublicLayout loading={loading}>
      {data?.posts && (
        <>
          <h2>Posts by {data.posts[0].author.fullName}</h2>
          <BlogList posts={data.posts}></BlogList>
        </>
      )}
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(PostsByAuthor);
