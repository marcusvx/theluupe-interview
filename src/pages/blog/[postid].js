import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';
import { useRouter } from 'next/router';

const NewPost = () => {
  const router = useRouter();
  const { postid } = router.query;

  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Post {postid}</Card.Title>
              <Card.Body>Blog</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(NewPost);
