import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';

const PostsByAuthor = () => {
  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Blog Posts By Author</Card.Title>
              <Card.Body>Blog Posts by author</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(PostsByAuthor);
