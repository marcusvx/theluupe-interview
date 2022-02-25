import gql from 'graphql-tag';

const UserInfo = gql`
  fragment UserInfo on User {
    id
    email
    firstName
    lastName
    fullName
    totalPosts
  }
`;

const PostListItem = gql`
  fragment PostListItem on Post {
    id
    title
    createdAt
    author {
      fullName
      id
    }
  }
`;

const PostDetail = gql`
  ${PostListItem}
  fragment PostDetail on Post {
    content
    ...PostListItem
  }
`;

export { UserInfo, PostListItem, PostDetail };
