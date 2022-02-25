import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { BlogPost } from '@dal/BlogPost';
import Link from 'next/link';
import Moment from 'react-moment';
import styled from '@emotion/styled';
import { Icon } from '@atoms/Icon';
import useUser from '@lib/use-user';
import { PostEditionControls } from './PostEditionControls';

interface BlogListProps {
  posts: ReadonlyArray<BlogPost>;
}
const BlogList = ({ posts }: BlogListProps) => {
  const { user, loggedOut } = useUser();

  return (
    <Container fluid>
      <Row>
        {posts.map(post => (
          <Col key={post.id}>
            <BlogPostCard>
              <Card.Body>
                <Card.Title>
                  <Link href={`blog/${post.id}`}>
                    <a className="h3">{post.title}</a>
                  </Link>
                </Card.Title>
                <Card.Text>
                  <span>Posted</span> by <strong>{post.author.fullName}</strong> on{' '}
                  <Moment format="MMMM DD, YYYY">{post.createdAt}</Moment>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link href={`blog/${post.id}`}>
                    <a className="text-brand-red">
                      Read more <Icon className="ml-2" icon="next" size={12} color="var(--brand-bubble)" />
                    </a>
                  </Link>
                  {!loggedOut && user?.id === post.author.id && (
                    <PostEditionControls postId={post.id}></PostEditionControls>
                  )}
                </div>
              </Card.Body>
            </BlogPostCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const BlogPostCard = styled(Card)`
  min-width: 32rem;
  border-radius: 0;
  background-color: #fbf7f6;
  border: none;
  margin: 15px auto;
`;

export { BlogList };
