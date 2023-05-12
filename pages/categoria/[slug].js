import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/components/Layout';
import { Categories, Loader, PostCard, PostWidget } from '@/app/components';
import { getCategoryPost } from '@/app/services';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const result = await getCategoryPost(slug);
          setLoading(false);
          setPosts(result);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchPost();
    }
  }, [slug]);

  return (
    <Layout>
      {loading && <Loader />}
      {posts.length > 0 ? (
        <div className="container mx-auto px-5 md:px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 col-span-1">
              {posts.map((post) => (
                <PostCard key={post.node.titulo} post={post.node} />
              ))}
            </div>
            <div className="lg:col-span-4 col-span-1">
              <div className="lg:sticky relative top-4 md:p-8">
                <PostWidget />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-5 md:px-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 col-span-1">
              <div className='shadow-xl p-0 lg:p-4 md:p-8 pb-12 mb-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl drop-shadow-xl text-white'>

                <p className="text-center">No hay posts aún para esta categoría</p>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-1">
              <div className="lg:sticky relative top-4 md:p-8">
                <PostWidget />
                <Categories />
              </div>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default CategoryPage;
