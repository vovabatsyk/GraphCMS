import type { NextPage } from 'next';
import Head from 'next/head';
import { PostCard, PostWidget, Categories, FeaturedPosts } from '../components';
import { getCategories, getPosts } from '../services';
import { Post } from '../types/post.interface';

interface PropsType {
  posts: any;
}

const Home = ({ posts }: PropsType) => {
  return (
    <div className='container mx-auto px-10 mb-8 '>
      <FeaturedPosts />
      <Head>
        <title>Home Page</title>
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post: any, index: number) => (
            <PostCard
              post={post}
              key={index}
            />
          ))}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

export default Home;
