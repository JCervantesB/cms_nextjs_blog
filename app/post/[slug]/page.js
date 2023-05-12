'use client'

import { useEffect, useState } from "react"
import { useParams } from 'next/navigation';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import { AdjacentPosts } from "../../sections";

const PostDetails = () => {
  const {slug} = useParams()
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const result = await getPostDetails(slug);
          setLoading(false);
          setPost(result);
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchPost();
    }
  }, [slug]);

  return (
    <>
      {loading && <Loader />}
      <div className="container mx-auto px-5 md:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post}/>
            <Author autor={post?.autor} />
            <AdjacentPosts slug={post?.slug} createdAt={post?.createdAt} />
            <CommentsForm slug={post?.slug} />
            <Comments slug={post?.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-4 md:p-8">
              <PostWidget slug={post?.slug} categories={post?.categorias.map((categoria) => categoria.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;


export async function getStaticPaths() {
  const posts = await getPosts();
  
  return {
    paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: false,
  }
}
