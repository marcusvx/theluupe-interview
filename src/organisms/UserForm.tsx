import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/react-hooks';

import { IUser } from '@dal/User';
import { User as UserSchema } from '@shared/validation/schemas';
import { CreateUser } from '@lib/gql/mutations.gql';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';

export type IUserFormProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

export function UserForm({ onSubmit, onCancel }: IUserFormProps): JSX.Element {
  const [createUser] = useMutation(CreateUser);
  const initialValues = {};

  const handleSubmit = useCallback(
    async (user: Partial<IUser>) => {
      const createResults = await createUser({
        variables: {
          ...user,
        },
      });
      onSubmit();
      return createResults;
    },
    [onSubmit, createUser],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={UserSchema}>
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
                <TextField label="First name" name="firstName" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Last name" name="lastName" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Password" name="password" />
              </ColGroup>
            </Row>
            <Row>
              <ColGroup>
                <TextField label="Conmfirm Password" name="passwordConfirmation" />
              </ColGroup>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton>Add</SubmitButton>
            <Button disabled={isSubmitting} variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
}