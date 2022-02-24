import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/react-hooks';

import { SessionUser } from '@dal/SessionUser';
import { UserEdit as UserSchema } from '@shared/validation/schemas';
import { EditUser } from '@lib/gql/mutations.gql';

import { ColGroup, Form, Formik, Row } from '@atoms/Form';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';

export type UserEditForm = {
  user: Partial<SessionUser>;
  onSubmit: (user: SessionUser) => void;
};

const UserEditForm = ({ user, onSubmit }: UserEditForm): JSX.Element => {
  const { id, firstName, lastName } = user;
  const [editUser] = useMutation(EditUser);
  const initialValues = { firstName, lastName };

  const handleSubmit = useCallback(async (userForm: Partial<SessionUser>) => {
    const { data } = await editUser({
      variables: {
        id,
        ...userForm,
      },
    });
    onSubmit(data.editUser);
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={UserSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton>Save</SubmitButton>
          </Modal.Footer>
        </Form>
      )}
    </Formik>
  );
};

export { UserEditForm };
