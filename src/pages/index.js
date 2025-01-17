import React from 'react';

import { withApollo } from '@lib/apollo';
import { PublicLayout } from '@templates/Layout';
import { Heading } from '@atoms/Heading';

function Index() {
  return (
    <PublicLayout loading={false}>
      <Heading type="h4">Welcome to The Luupe interview app.</Heading>
      <p className="mt-3">
        This is a sandbox based on our actual app. Meaning, the structure, packages and principals of our app are all
        present in here.
      </p>
      <p>A couple of things to take into account:</p>

      <ul>
        <li>Our Frontend structure is based on atomic design: https://bradfrost.com/blog/post/atomic-web-design/</li>
        <ul>
          <li>Atoms: Base components</li>
          <li>Molecules: Components made of Atoms</li>
          <li>Organisms: Components made of Molecules and Atoms</li>
          <li>Templates: Components made of Organisms</li>
        </ul>
        <li>We added a fair amount of Icons so you should be covered on that regard :)</li>
        <li>We're expecting you to work with TypeScript on the Client and JavaScript on the Server</li>
        <li>
          We included a couple of files to help you out making the app (and also test how you would integrate with
          Components already existing in the App) like for example 'DeleteModal' and 'server/routers/auth.js'
        </li>
        <li>Our main tech stack is:</li>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>SQL</li>
          <li>Prisma</li>
          <li>Nexus</li>
          <li>Node.js</li>
          <li>GraphQL</li>
          <li>React</li>
          <li>Nextjs</li>
        </ul>
        <li>We're including two pages</li>
        <ul>
          <li>Index: With a summary of the activities</li>
          <li>Users: Where we currently manage all the info related to a user</li>
        </ul>
      </ul>

      <Heading variant="secondary">We wish you the best of lucks!!</Heading>

      <Heading className="mt-5">ACTIVITIES</Heading>
      <ul>
        <li>
          <del>
            Update the `dev` NPM Script to allow us to run the App using nodemon (package already installed). `start`
            Script should remain as it is
          </del>
        </li>
        <li>Add Post Feature</li>
        <ul>
          <li>
            <del>Posts have an Author</del>
          </li>
          <li>
            <del>An Author can have multiple Posts</del>
          </li>
          <li>
            <del>We should be able to add, edit and delete Posts</del>
          </li>
          <li>Add totalPosts per User on the User table</li>
          <li>
            <del>Create a view to display all the Posts</del>
          </li>
          <li>
            <del>Create a view to display all the Posts for a User</del>
          </li>
        </ul>
        <li>
          <del>Allow users to edit their information</del>
        </li>
        <li>
          <del>Add Authentication (login, signup)</del>
        </li>
        <ul>
          <li>
            <del>Display the username on the Header</del>
          </li>
        </ul>
        <li>Improve permissions</li>
        <ul>
          <li>
            <del>Everyone can read the Posts (general Posts page)</del>
          </li>
          <li>
            <del>Only authenticated users can read the Posts per user</del>
          </li>
          <li>
            <del>Only the author can edit/delete their posts</del>
          </li>
          <li>
            <del>Only a User can edit their info</del>
          </li>
        </ul>
        <li>
          <del>Refresh the tables after adding/removing/modifying an entry</del>
        </li>
      </ul>

      <Heading className="mt-3">NICE TO HAVE</Heading>
      <ul>
        <li>
          <del>Solve the n+1 problem while fetching All the users will all their Posts</del>
        </li>
        <li>
          <del>Create prisma Seeds and a NPM Script to add them to our DB</del>
        </li>
        <li>
          <del>Paginate the tables</del>
        </li>
      </ul>
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Index);
