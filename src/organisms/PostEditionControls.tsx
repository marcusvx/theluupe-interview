import Link from 'next/link';
import { useState, useCallback } from 'react';
import { DeleteModal } from './DeleteModal';
import { useMutation } from '@apollo/react-hooks';
import { DeletePost } from '@lib/gql/mutations.gql';
import { Button } from 'react-bootstrap';

interface PostEditionControlsProps {
  postId: string;
}

const PostEditionControls = ({ postId }: PostEditionControlsProps) => {
  const [showDeleteModal, setShowUserModal] = useState(false);
  const [deletePost] = useMutation(DeletePost, {
    refetchQueries: ['GetPosts'],
  });

  const closeModal = () => setShowUserModal(false);
  const handleConfirm = useCallback(async () => {
    await deletePost({ variables: { id: postId } });
  }, []);

  return (
    <div className="d-flex">
      <Button className="btn btn-secondary" onClick={() => setShowUserModal(true)}>
        Delete
      </Button>
      <Link href={`/blog/edit/${postId}`}>
        <a className="btn btn-secondary">Edit</a>
      </Link>
      <DeleteModal
        show={showDeleteModal}
        onConfirm={handleConfirm}
        onClose={closeModal}
        isLoading={false}
      ></DeleteModal>
    </div>
  );
};

export { PostEditionControls };
