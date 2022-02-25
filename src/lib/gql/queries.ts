import gql from 'graphql-tag';
import { UserInfo, PostListItem, PostDetail } from './fragments';

const GetUsers = gql`
  ${UserInfo}
  query GetUsers {
    users {
      ...UserInfo
    }
  }
`;

const GetPost = gql`
  ${PostDetail}
  query GetPost($id: String!) {
    post(where: { id: $id }) {
      ...PostDetail
    }
  }
`;

const GetPosts = gql`
  ${PostListItem}
  query GetPosts {
    posts {
      ...PostListItem
    }
  }
`;

const GetPostsByAuthor = gql`
  ${PostListItem}
  query GetPostsByAuthor($id: StringFilter!) {
    posts(where: { author: { id: $id } }) {
      ...PostListItem
    }
  }
`;

export { GetUsers, GetPosts, GetPost, GetPostsByAuthor };
