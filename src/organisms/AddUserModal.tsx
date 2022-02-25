import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { ModalHeader } from '@molecules/ModalHeader';
import { UserForm } from './UserForm';
import { addNotification } from '@lib/notifications';

export type IAddUserModalProps = {
  show: boolean;
  onClose: () => void;
};

export function AddUserModal({ show, onClose }: IAddUserModalProps): JSX.Element {
  const onSubmit = () => {
    addNotification({ type: 'success', title: '', message: 'User created successfully' });
    onClose();
  };

  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Add a user" onClose={onClose} />
      <UserForm onCancel={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}
