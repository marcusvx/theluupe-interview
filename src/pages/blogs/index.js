import React from 'react';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';
import { GetPosts } from '@lib/gql/queries.gql';
import { useQuery } from '@apollo/react-hooks';
import { BlogList } from '@organisms/BlogList';
import Link from 'next/link';

const Posts = () => {
  const { data, loading } = useQuery(GetPosts);

  return (
    <PublicLayout loading={loading}>
      <div className="d-flex justify-content-between">
        <div className="pl-4">
          <span className="h2">Blog</span>
        </div>
        <div className="pr-4">
          <Link href="/blog/new">
            <a className="btn btn-secondary">New Post</a>
          </Link>
        </div>
      </div>

      {data?.posts && <BlogList posts={data.posts}></BlogList>}
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);
