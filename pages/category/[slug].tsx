import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, MyLoader } from '../../components';
import { Post } from '../../types/post.interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Category } from '../../types/category.interface';

interface PropsType {
  posts: Post[];
}

const CategoryPost = ({ posts }: PropsType) => {
  const router = useRouter();

  if (router.isFallback) {
    return <MyLoader />;
  }

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {posts?.map((post: Post, index: number) => (
            <PostCard
              key={index}
              post={post}
            />
          ))}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { slug } = context.params;
  const posts = await getCategoryPost(slug);
  return {
    props: {
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: Category[] = await getCategories();
  const paths = categories.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};
