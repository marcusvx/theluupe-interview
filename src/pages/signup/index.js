import React from 'react';
import { useRouter } from 'next/router';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { UserForm } from '@organisms/UserForm';
import { withApollo } from '@lib/apollo';

const Signup = () => {
  const router = useRouter();

  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Signup</Card.Title>
              <Card.Body>
                <UserForm onCancel={() => router.push('/pages')} onSubmit={() => router.push('/login')} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Signup);
