import React from 'react';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';
import { useRouter } from 'next/router';
import { GetPost } from '@lib/gql/queries.gql';
import { useQuery } from '@apollo/react-hooks';
import { PostView } from '@organisms/PostView';

const NewPost = () => {
  const router = useRouter();
  const { postid } = router.query;
  const { data, loading } = useQuery(GetPost, { variables: { id: postid } });

  console.log(data, postid, loading);
  return <PublicLayout loading={loading}>{data?.post && <PostView post={data.post}></PostView>}</PublicLayout>;
};

// eslint-disable-next-line import/no-default-export
export default withApollo(NewPost);
