'use client';
import React, { useState, useEffect } from 'react';

function ClientOnly({ children }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

  return (
    <>
        {children}
    </>
  )
}

export default ClientOnly