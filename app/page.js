'use client';

import { useEffect, useState } from "react";
import { PostCard, Categories, PostWidget, Loader } from "./components";
import { getPosts } from "./services";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setLoading(false);
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => (
              <PostCard key={post.node.titulo} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
