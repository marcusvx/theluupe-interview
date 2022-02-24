import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/react-hooks';

import { PostInput } from '@dal/PostInput';
import { Post as PostSchema } from '@shared/validation/schemas';
import { CreatePost } from '@lib/gql/mutations.gql';

import { ColGroup, Field, Form, Formik, Row } from '@atoms/Form';
import { SubmitButton } from '@molecules/forms/SubmitButton';
import { TextField } from '@molecules/forms/TextField';
import RichTextEditor from '@molecules/forms/RichTextEditor';
import { useRouter } from 'next/router';
import { BlogPost } from '@dal/BlogPost';

export function PostForm(): JSX.Element {
  const [createPost] = useMutation(CreatePost);
  const initialValues: PostInput = { content: '', title: '' };
  const router = useRouter();

  const handleSubmit = useCallback(async (post: Partial<PostInput>): Promise<void> => {
    const { data } = await createPost({
      variables: {
        postCreationInput: { ...post },
      },
    });

    router.push(`/blog/${data.createPost.id}`);
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

          <Button disabled={isSubmitting} variant="secondary">
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
}
