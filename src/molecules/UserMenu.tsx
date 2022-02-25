import React from 'react';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { Icon } from '@atoms/Icon';
import useUser from '@lib/use-user';
import { useRouter } from 'next/router';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <Icon className="mr-2" icon="user" size={12} color="var(--brand-bubble)" />
            {`${firstName} ${lastName}`}{' '}
            <Icon className="mr-2" icon="chevron-down" size={12} color="var(--brand-bubble)" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/users">Users</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    </>
  );
};

export { UserMenu };
