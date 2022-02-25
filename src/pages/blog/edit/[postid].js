import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { PostForm } from '@organisms/PostForm';
import { withApollo } from '@lib/apollo';
import { GetPost } from '@lib/gql/queries.gql';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const NewPost = () => {
  const router = useRouter();
  const { postid } = router.query;
  const { data, loading } = useQuery(GetPost, { variables: { id: postid } });

  return (
    <PublicLayout loading={loading}>
      <h2>Edit Post</h2>

      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title></Card.Title>
              <Card.Body>{data?.post && <PostForm post={data.post} />}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(NewPost);
