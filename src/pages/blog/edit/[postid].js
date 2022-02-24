import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { PostForm } from '@organisms/PostForm';
import { withApollo } from '@lib/apollo';
import { GetPost } from '@lib/gql/queries.gql';
import { useQuery } from '@apollo/react-hooks';

const NewPost = () => {
    const router = useRouter();
  const { postid } = router.query;
  const { data, loading } = useQuery(GetPost, { variables: { id: postid } });

  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>New Post</Card.Title>
              <Card.Body>
                <PostForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(NewPost);
