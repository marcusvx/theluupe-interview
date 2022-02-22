import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { ModalHeader } from '@molecules/ModalHeader';
import { UserForm } from './UserForm';

export type IAddUserModalProps = {
  show: boolean;
  onClose: () => void;
};

export function AddUserModal({ show, onClose }: IAddUserModalProps): JSX.Element {
  return (
    <Modal show={show} centered onHide={onClose}>
      <ModalHeader title="Add a user" onClose={onClose} />
      <UserForm onCancel={onClose} onSubmit={onClose} />
    </Modal>
  );
}
