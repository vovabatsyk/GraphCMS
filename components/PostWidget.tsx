import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';
import { Category } from '../types/category.interface';
import { Post } from '../types/post.interface';

interface PropsType {
  categories?: string[];
  slug?: string;
}

const PostWidget = ({ categories, slug }: PropsType) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories!, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div
          key={post.slug}
          className='flex items-center w-full mb-4'
        >
          <div className='w-16 flex-none'>
            <img
              src={post.feturedImage.url}
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-400 text-xs'>
              {moment(post.createdAt).format('DD.MM.YYYY hh:mm')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              className='text-xs transition duration-500 ease transform hover:-translate-y-1  hover:text-pink-600'
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
