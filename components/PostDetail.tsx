import React from 'react';
import { Post } from '../types/post.interface';
import { RichText } from '@graphcms/rich-text-react-renderer';
import AuthorHeader from './AuthorHeader';
interface PropsType {
  post: Post;
}
const PostDetail = ({ post }: PropsType) => {
  return (
    <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.feturedImage.url}
          alt={`${post.title} image`}
          className='object-top w-full h-full rounded-t-lg'
        />
      </div>
      <div className='px-4 lg:px-0'>
        <AuthorHeader
          author={post.author}
          createdAt={post.createdAt}
        />
        <h1 className='mb-8 text-3xl font-semibold'>{post.title}</h1>
        <RichText content={post.content.raw.children} />
      </div>
    </div>
  );
};

export default PostDetail;
