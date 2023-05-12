import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query Posts {
            postsConnection {
                edges {
                    node {
                        autor {
                            biografia
                            nombre
                            id
                            avatar {
                                url
                            }
                        }
                        createdAt
                        slug
                        titulo
                        extracto
                        imagenDestacada {
                            url
                        }
                        categorias {
                            nombre
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                titulo
                imagenDestacada {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
};

export const getSimilarPosts = async (categorias, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categorias: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categorias_some: { slug_in: $categorias }}}
                last: 3
            ) {
                titulo
                imagenDestacada {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, { categorias, slug });

    return result.posts;
};

export const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug: String!) {
        comentarios(where: {post: {slug:$slug}}){
          nombre
          createdAt
          comentario
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.comentarios;
  };

export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}) {
            autor {
                biografia
                nombre
                id
                avatar {
                    url
                }
            }
            createdAt
            slug
            contenido {
                raw
            }
            titulo
            extracto
            imagenDestacada {
                url
            }
            categorias {
                nombre
                slug
            }
        }
      }
    `;

    const result = await request(graphqlAPI, query, { slug });
    return result.post;
};

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categorias {
                nombre
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.categorias;
};

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
};

// Obtener postDestacados
export const getFeaturedPosts = async () => {
    const query = gql`
        query GetFeaturedPosts {
            posts(where: {postDestacado: true}) {
                autor {
                    nombre
                    avatar {
                        url
                    }
                }
                imagenDestacada {
                    url
                }
                titulo
                slug
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI, query);

    return result.posts;
}

// Buscador de posts
export const searchPosts = async (termino) => {
    const query = gql`
        query SearchPosts($termino: String!) {
            posts(where: {OR: [{titulo_contains: $termino}, {contenido: {raw_contains: $termino}}]}) {
                titulo
                slug
                extracto
                imagenDestacada {
                    url
                }
                autor {
                    nombre
                    avatar {
                        url
                    }
                }
                createdAt
            }
        }
    `

    const result = await request(graphqlAPI, query, { termino });

    return result.posts;
}
  
// Obtener posts por categoría
export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(
                where: {categorias_some: {slug: $slug}}
                orderBy: createdAt_DESC
                ) {
                edges {
                    cursor
                    node {
                        autor {
                            nombre
                            biografia
                            id
                            avatar {
                                url
                            }
                        }
                        createdAt
                        slug
                        titulo
                        extracto
                        imagenDestacada {
                            url
                        }
                        categorias {
                            nombre
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges;
}

export const getAdjacentPosts = async (createdAt, slug) => {
    const query = gql`
        query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
            next: posts(
                first: 1
                orderBy: createdAt_ASC
                where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
            ) {
                titulo
                imagenDestacada {
                    url
                }
                createdAt
                slug
            }
            previous: posts(
                first: 1
                orderBy: createdAt_DESC
                where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
            ) {
                titulo
                imagenDestacada {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    
    const result = await request(graphqlAPI, query, { slug, createdAt });
        
    return { next: result.next[0], previous: result.previous[0] };
};