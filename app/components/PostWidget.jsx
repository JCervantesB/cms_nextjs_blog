'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug]);


  return (
    <div className='shadow-xl p-8 mb-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-rose-500'>
            {slug ? 'Artículos relacionados' : 'Artículos recientes'}
        </h3>
        {relatedPosts.map((post) => (
            <div key={post.titulo} className='flex items-center w-full mb-4'>
                <div className='w-16 flex-none'>
                    <img
                        src={post.imagenDestacada.url}
                        alt={post.titulo}
                        height='60px'
                        width='60px'
                        className='align-middle rounded-full object-cover'
                    />
                </div>
                <div className='flex-grow ml-4'>
                    <p className='text-gray-500 font-xs'>
                        {moment(post.createdAt).format('DD MMMM YYYY')}
                    </p>
                    <Link href={`/post/${post.slug}`} key={post.titulo} className='text-md transition duration-700 cursor-pointer hover:text-rose-500'>
                        {post.titulo}
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PostWidget