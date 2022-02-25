import gql from 'graphql-tag';
import { UserInfo, PostDetail } from './fragments';

const CreateUser = gql`
  ${UserInfo}
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(signupInput: { firstName: $firstName, lastName: $lastName, email: $email, password: $password }) {
      ...UserInfo
    }
  }
`;

const CreatePost = gql`
  ${PostDetail}
  mutation CreatePost($postCreationInput: PostCreationInput!) {
    createPost(postCreationInput: $postCreationInput) {
      ...PostDetail
    }
  }
`;

const EditUser = gql`
  ${UserInfo}
  mutation EditUser($firstName: String!, $lastName: String!, $id: String!) {
    editUser(userEditInput: { firstName: $firstName, lastName: $lastName, id: $id }) {
      ...UserInfo
    }
  }
`;

const EditPost = gql`
  ${PostDetail}
  mutation EditPost($postUpdateInput: PostUpdateInput!) {
    editPost(postUpdateInput: $postUpdateInput) {
      ...PostDetail
    }
  }
`;

const DeletePost = gql`
  mutation DeletePost($id: String!) {
    deletePost(objectDeleteInput: { id: $id }) {
      id
    }
  }
`;

export { CreateUser, CreatePost, EditUser, EditPost, DeletePost };
