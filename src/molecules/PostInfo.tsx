import React from 'react';
import Moment from 'react-moment';
import useUser from '@lib/use-user';
import Link from 'next/link';

interface PostInfoProps {
  date: string;
  author: {
    id: string;
    fullName: string;
  };
}
const PostInfo = ({ author, date }: PostInfoProps) => {
  const { loggedOut } = useUser();

  return (
    <>
      <span>Posted</span> by{' '}
      {loggedOut ? (
        <strong>{author.fullName}</strong>
      ) : (
        <Link href={`/blog/author/${author.id}`}>
          <a>{author.fullName}</a>
        </Link>
      )}{' '}
      on <Moment format="MMMM DD, YYYY">{date}</Moment>
    </>
  );
};

export { PostInfo };
