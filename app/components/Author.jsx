import React from 'react'

const Author = ({autor}) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-xl bg-white bg-opacity-10 backdrop-blur-lg drop-shadow-xl text-white'>
      <div className='absolute left-0 right-0 -top-14'>
        <img 
          alt={autor?.nombre}
          src={autor?.avatar.url}
          height="100px"
          width="100px"
          className='align-middle rounded-full object-cover m-auto'
        />
      </div>
        <h3 className='text-white my-4 text-xl font-bold'>{autor?.nombre}</h3>
        <p>{autor?.biografia}</p>
    </div>
  )
}

export default Author