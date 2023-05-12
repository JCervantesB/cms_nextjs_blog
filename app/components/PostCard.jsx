import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import Link from 'next/link'
import { BsCalendar2Event } from 'react-icons/bs'

const PostCard = ({ post }) => {
  return (
    <div className='shadow-xl p-0 lg:p-4 md:p-8 pb-12 mb-8 bg-black bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img
          src={post.imagenDestacada.url}
          alt={post.titulo}
          className='align-middle object-top absolute h-80 w-full object-cover shadow-xl rounded-t-xl lg:rounded-xl'
        />
      </div>
      <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-rose-500 text-3xl font-semibold'>
        <Link href={`/post/${post.slug}`}>{post.titulo}</Link>
      </h1>
      <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 text-sm md:text-sm md:text-lg'>
          <img 
            alt={post.autor.nombre}
            height="30px"         
            width="30px"
            className='align-middle rounded-full object-cover' 
            src={post.autor.avatar.url}
          />
          <p className='inline align-middle text-neutral-300 ml-2 text-sm md:text-lg'>
            {post.autor.nombre}
          </p>
        </div>
        <div className='font-medium text-neutral-300'>
          <BsCalendar2Event className='inline align-middle text-rose-500' size={20} />
          <span>
            {' '}{moment(post.createdAt).format('DD MMMM YYYY')}
          </span>
        </div>
      </div>
      <p className='text-center text-sm md:text-lg text-white font-normal px-4 lg:px-20 mb-8'>
        {post.extracto}
      </p>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`}>
          <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-rose-500 font-medium rounded-full text-white px-8 py-3 cursor-pointer'>
            Continuar leyendo
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard