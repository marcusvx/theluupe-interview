import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Nav from 'react-bootstrap/Nav';
import Logo from '@assets/logos/theluupe.svg';
import useUser from '@lib/use-user';
import { UserMenu } from './UserMenu';
export const HEADER_HEIGHT = '84px';

export function HorizontalNav() {
  const { loggedOut } = useUser();

  return (
    <header>
      <Wrapper className="py-2 px-4">
        <div className="d-flex align-items-center">
          <Nav.Item className="mr-4">
            <Link href="/">
              <a>
                <Logo css={{ color: 'var(--brand-red)' }} />
              </a>
            </Link>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/about">
              ABOUT
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/brands">
              BRANDS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/our-artists">
              PHOTOGRAPHERS
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <a className="nav-link" href="https://theluupe.com/blog">
              MAGAZINE
            </a>
          </Nav.Item>
          <Nav.Item className="mr-1">
            <Link href="/blog">
              <a className="nav-link">Blog</a>
            </Link>
          </Nav.Item>
        </div>
        {!loggedOut && <UserMenu />}
        {loggedOut && (
          <Nav.Item className="mr-1">
            <Link href="/login">
              <a className="btn btn-secondary">Log in</a>
            </Link>
            <Link href="/signup">
              <a className="btn btn-primary text-white ml-3">Sign up</a>
            </Link>
          </Nav.Item>
        )}
      </Wrapper>
    </header>
  );
}

const Wrapper = styled(Nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${HEADER_HEIGHT};
  border-bottom: 1px solid var(--gray-low-surface);
  background-color: white;
  position: fixed;
  width: 100%;
  top: 0;
`;
