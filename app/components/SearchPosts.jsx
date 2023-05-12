'use client';

import { useState } from 'react';
import { searchPosts } from '../services/index.js';

export default function Buscador() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleInputChange = (e) => {
    setTerminoBusqueda(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posts = await searchPosts(terminoBusqueda);
    setResultados(posts);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Buscar:
          <input type="text" value={terminoBusqueda} onChange={handleInputChange} />
        </label>
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {resultados.map((post) => (
          <li key={post?.slug}>
            <h2>{post?.titulo}</h2>
            <p>{post?.extracto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}