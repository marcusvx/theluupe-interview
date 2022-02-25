import React from 'react';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { Icon } from '@atoms/Icon';
import useUser from '@lib/use-user';
import { useRouter } from 'next/router';

const UserMenu = () => {
  const { user, mutate, loggedOut } = useUser();
  const router = useRouter();

  if (loggedOut || !user) {
    return null;
  }

  const { firstName, lastName } = user!;

  const handleLogout = async () => {
    await fetch('/auth/logout');
    mutate();
    router.push('/');
  };

  return (
    <>
      <Nav.Item className="mr-1">
        <Link href="/profile">
          <a className="btn btn-secondary">
            <Icon className="mr-2" icon="user" size={12} color="var(--brand-bubble)" />
            {`${firstName} ${lastName}`}
          </a>
        </Link>
        <button onClick={handleLogout} className="btn btn-primary text-white ml-3">
          Sign Out
        </button>
      </Nav.Item>
    </>
  );
};

export { UserMenu };
