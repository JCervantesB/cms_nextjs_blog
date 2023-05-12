'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
      }, []);

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-neutral-300 p-8 bg-black bg-opacity-10 backdrop-blur-lg rounded-b-xl drop-shadow-xl'>
            <div className='text-center md:float-left block'>
                <Link href='/'>
                    <span className='cursor-pointer font-bold text-4xl text-rose-500'>
                        JC Blog
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {categories.map((category) => (
                    <Link key={category.slug} href={`/categoria/${category.slug}`}>
                        <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold transition duration-700 cursor-pointer hover:text-rose-500 hover:-translate-y-1'>
                            {category.nombre}
                        </span>
                    </Link>
                ))}
            </div>
        </div>        
    </div>
  )
}

export default Header