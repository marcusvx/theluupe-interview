import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

import { PublicLayout } from '@templates/Layout';
import { LoginForm } from '@organisms/LoginForm';
import { withApollo } from '@lib/apollo';

const Login = () => {
  return (
    <PublicLayout loading={false}>
      <Container fluid="sm">
        <Row>
          <Col>
            <Card>
              <Card.Title>Login</Card.Title>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default withApollo(Login);
