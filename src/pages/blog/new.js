import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { PostForm } from '@organisms/PostForm';
import { withApollo } from '@lib/apollo';

const NewPost = () => {
  return (
    <PublicLayout loading={false}>
      <h2>New Post</h2>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
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
