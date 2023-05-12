'use client';

import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import moment from "moment";
import "moment/locale/es";
import parse from 'html-react-parser';

import { getComments } from '../services';


const Comments = () => {
  const {slug} = useParams()
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      const fetchComments = async () => {
        const comments = await getComments(slug);
        setComments(comments);
      };
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  return (
    <>
      {comments.length > 0 && (
        <div className='shadow-xl p-8 mb-8 bg-black bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {comments.length}
            {' '}
            {comments.length === 1 ? 'Comentario' : 'Comentarios'}
          </h3>
          {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4 text-gray-500">
                <p className="mb-4">
                  <span className="font-semibold text-rose-500">{comment.nombre}</span>
                  {' '}
                  el
                  {' '}
                  {moment(comment.createdAt).format('DD MMMM YYYY')}
                </p>
                <p className="whitespace-pre-line text-gray-400 w-full">{parse(comment.comentario)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default Comments
