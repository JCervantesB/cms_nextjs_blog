'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container mx-auto px-5 md:px-10 mb-8'>
      <div className='border-b w-full inline-block border-neutral-300 p-4 md:p-8 bg-black bg-opacity-10 backdrop-blur-lg rounded-b-xl drop-shadow-xl'>
        <div className='text-center md:float-left block'>
          <Link href='/'>
            <p className='cursor-pointer font-bold text-4xl text-rose-500'>
              Blog
              <span>{'('}</span>
              <span className='text-amber-500'>{'{'}</span>
              JC
              <span className='text-amber-500'>{'}'}</span>
              <span>{')'}</span>
            </p>
          </Link>
        </div>
        <div ref={menuRef} className={`flex flex-col md:float-right mt-2 md:contents ${isOpen ? 'block' : 'hidden'}`}>
          {categories.map((category) => (
            <Link key={category.slug} href={`/categoria/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold transition duration-700 cursor-pointer hover:text-rose-500 hover:-translate-y-1'>
                {category.nombre}
              </span>
            </Link>
          ))}
        </div>
        <button
          className='md:hidden absolute top-2 right-1 p-2 rounded'
          onClick={toggleMenu}
        >
          {isOpen ? <AiOutlineClose className='w-8 h-8 fill-current text-white' /> : <BiMenu className='w-8 h-8 fill-current text-white' />}
        </button>
      </div>        
    </div>
  );
};

export default Header;
