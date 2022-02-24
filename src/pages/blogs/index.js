import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { withApollo } from '@lib/apollo';

const Posts = () => {
  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Blog Posts</Card.Title>
              <Card.Body>Blog Posts</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);
