import React from 'react';
import { useRouter } from 'next/router';
import {
  Categories,
  PostWidget,
  Comments,
  CommentsForm,
  PostDetail,
  Author,
  MyLoader,
} from '../../components';
import { getPostDetails, getPosts } from '../../services';
import { Post } from '../../types/post.interface';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PropsType {
  post: Post;
}

const PostDetails = ({ post }: PropsType) => {
  const router = useRouter();

  if (router.isFallback) {
    return <MyLoader />;
  }
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params;
  const data = await getPostDetails(slug);
  return {
    props: {
      post: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: Post[] = await getPosts();
  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};
