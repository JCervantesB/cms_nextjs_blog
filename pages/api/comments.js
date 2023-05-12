/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(req, res) {
    const { nombre, email, comentario, slug } = req.body;
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        },
    });

    const query = gql`
    mutation CreateComentario($nombre: String!, $email: String!, $comentario: String!, $slug: String!) {
      createComentario(data: {nombre: $nombre, email: $email, comentario: $comentario, post: {connect: {slug: $slug}}}) { id }
    }
  `;
    
    const result = await graphQLClient.request(query, {
        nombre,
        email,
        comentario,
        slug
      });

    return res.status(200).send(result);
    
}
