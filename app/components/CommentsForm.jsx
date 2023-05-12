'use client';

import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('nombre') || '';
    emailEl.current.value = window.localStorage.getItem('email') || '';    
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comentario } = commentEl.current;
    const { value: nombre } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if(!commentEl.current.value || !nameEl.current.value || !emailEl.current.value) {
      setError(true);
      return;
    }

    const commentObject = {
      nombre, email, comentario, slug
    };

    if (storeData) {
      window.localStorage.setItem('nombre', nombre);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('nombre');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObject)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    );
  }

  
  return (
    <div className='shadow-xl p-8 mb-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Deja un comentario</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea 
          ref={commentEl} 
          className='p-4 outline-none w-full rounded-xl focus:ring-2 focus:ring-gray-200 bg-gray-100 text-black'
          placeholder='Escribe tu comentario'
          name='comentario'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input 
          type='text'
          ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-xl focus:ring-2 focus:ring-gray-200 bg-gray-100 text-black'
          placeholder='Nombre'
          name='nombre'
        />
        <input 
            type='email'
            ref={emailEl}
            className='py-2 px-4 outline-none w-full rounded-xl focus:ring-2 focus:ring-gray-200 bg-gray-100 text-black'
            placeholder='Email'
            name='email'
          />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            type='checkbox'
            ref={storeDataEl}
            id='storeData'
            name='storeData' 
          />
          <label htmlFor='storeData' className='ml-2 text-gray-300 cursor-pointer select-none'>Guardar mis datos para la próxima vez que comente.</label>
        </div>
      </div>
      {error && (<p className='text-md text-center text-red-700 border border-red-700 bg-red-200 p-1'>Todos los campos son obligatorios.</p>)}
      <div className='mt-8'>
        <button
          onClick={handleCommentSubmit}
          type='button'
          className='transition duration-500 ease hover:bg-rose-700 inline-block bg-rose-500 text-white px-8 py-3 cursor-pointer rounded-xl justify-end'
        >
          Enviar comentario
        </button>
        {showSuccessMessage && (<span className='text-xl float-right font-semibold mt-3 text-green-600'>Comentario enviado</span>)}
      </div>
    </div>
  )
}

export default CommentsForm