import { BlogPost } from '@dal/BlogPost';
import { Card, Container, Row, Col } from 'react-bootstrap';

interface PostViewProps {
  post: BlogPost;
}

const PostView = ({ post }: PostViewProps) => {
  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <Card>
            <Card.Title>{post.title}</Card.Title>
            <Card.Body>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              ></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { PostView };
