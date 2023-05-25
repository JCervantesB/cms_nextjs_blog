'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);

  return (
    <div className='shadow-lg p-4 md:p-8 mb-8 pb-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-rose-500'>
            Categorias
        </h3>
        {categories.map((category) => (
            <Link href={`/categoria/${category.slug}`} key={category.slug} className='text-sm md:text-md transition duration-700 cursor-pointer hover:text-rose-500 hover:-translate-x-1'>
              <span className='cursor-pointer block pb-3 mb-3'>
                {category.nombre}
              </span>
            </Link>
        ))}
    </div>
  )
}

export default Categories