import { BlogPost } from '@dal/BlogPost';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

interface PostViewProps {
  post: BlogPost;
}

const PostView = ({ post }: PostViewProps) => {
  return (
    <Container className="position-relative">
      <h1>{post.title}</h1>

      <p className="text-secondary h5">
        By {post.author.fullName} on <Moment format="MMMM DD, YYYY">{post.createdAt}</Moment>
      </p>

      <article
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      ></article>
    </Container>
  );
};

export { PostView };
