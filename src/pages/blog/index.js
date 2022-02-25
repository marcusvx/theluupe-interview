import React, { useState } from 'react';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';
import { GetPosts } from '@lib/gql/queries';
import { useQuery } from '@apollo/react-hooks';
import { BlogList } from '@organisms/BlogList';
import Button from 'react-bootstrap/Button';

const TAKE = 5;

const Posts = () => {
  const { data, loading, fetchMore } = useQuery(GetPosts, {
    variables: {
      take: TAKE,
      skip: 0,
    },
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        skip: data.posts.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        });
      },
    });
  };

  return (
    <PublicLayout loading={loading}>
      <div className="d-flex justify-content-between">
        <div className="pl-4">
          <span className="h2">Blog</span>
        </div>
      </div>

      {data?.posts && <BlogList posts={data.posts}></BlogList>}

      <Button variant="secondary" onClick={loadMore}>
        Load More
      </Button>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);
