import React from 'react';
import { useRouter } from 'next/router';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { UserForm } from '@organisms/UserForm';
import { withApollo } from '@lib/apollo';
import { addNotification } from '@lib/notifications';

const Signup = () => {
  const router = useRouter();

  const handleSubmit = () => {
    addNotification({ type: 'success', title: '', message: 'Account created successfully' });
    router.push('/login');
  };

  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Signup</Card.Title>
              <Card.Body>
                <UserForm onCancel={() => router.push('/pages')} onSubmit={handleSubmit} />
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
