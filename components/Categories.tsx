import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../services';
import { Category } from '../types/category.interface';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);
  return (
    <div>
      <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Categories</h3>
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
          >
            <span className='cursor-pointer block pb-3 mb-3'>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
