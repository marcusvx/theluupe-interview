import React, { useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { LoginInput } from '@dal/LoginInput';
import { Login as LoginSchema } from '@shared/validation/schemas';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import useUser from '@lib/use-user';
import { useRouter } from 'next/router';

export function LoginForm(): JSX.Element {
  const initialValues = { email: '', password: '' };
  const { user, mutate, loggedOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !loggedOut) {
      router.push('/');
    }
  }, [user, loggedOut]);

  const handleSubmit = useCallback(async (input: Partial<LoginInput>) => {
    const { email, password } = input;
    const result = await fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate();
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Modal.Body>
            <Row>
              <ColGroup>
                <TextField label="Email" name="email" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Password" name="password" type="password" />
              </ColGroup>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton>Login</SubmitButton>
            <Button disabled={isSubmitting} variant="secondary">
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}
