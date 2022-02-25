import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/react-hooks';

import { PostInput } from '@dal/PostInput';
import { Post as PostSchema } from '@shared/validation/schemas';
import { CreatePost } from '@lib/gql/mutations.gql';
import { EditPost } from '@lib/gql/mutations.gql';

import { ColGroup, Field, Form, Formik, Row } from '@atoms/Form';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import RichTextEditor from '@molecules/forms/RichTextEditor';
import { useRouter } from 'next/router';
import { BlogPost } from '@dal/BlogPost';

interface PostFormProps {
  post?: BlogPost;
}

export function PostForm({ post }: PostFormProps): JSX.Element {
  const [createPost] = useMutation(CreatePost);
  const [editPost] = useMutation(EditPost);
  const initialValues: PostInput = { content: post?.content ?? '', title: post?.title ?? '' };
  const router = useRouter();

  const handleSubmit = useCallback(async (postInput: Partial<PostInput>): Promise<void> => {
    const { id } = await createOrEdit(postInput);
    console.log(id);
    router.push(`/blog/${id}`);
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <ColGroup>
              <TextField label="Title" name="title" />
            </ColGroup>
          </Row>
          <Row>
            <ColGroup>
              <Field name="content">
                {({ field }: any) => (
                  <RichTextEditor value={field.value} onChange={field.onChange(field.name)}></RichTextEditor>
                )}
              </Field>
            </ColGroup>
          </Row>

          <SubmitButton>Save</SubmitButton>
        </Form>
      )}
    </Formik>
  );

  async function createOrEdit(postInput: Partial<PostInput>): Promise<BlogPost> {
    if (post?.id) {
      const { data } = await editPost({
        variables: {
          postUpdateInput: { ...postInput, id: post.id },
        },
      });

      return data.editPost;
    }

    const { data } = await createPost({
      variables: {
        postCreationInput: { ...postInput },
      },
    });
    return data.createPost;
  }
}
