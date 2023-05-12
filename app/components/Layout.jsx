import React from 'react';
import Header from './Header';
import '../globals.scss'
import { Montserrat } from 'next/font/google'
import { FeaturedPosts } from '../sections';


const Layout = ({ children }) => (
  <>
    <Header />
    <FeaturedPosts />
    {children}
  </>
);

export default Layout;