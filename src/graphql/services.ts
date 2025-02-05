import { gql } from '@apollo/client';

export const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      blocks(postTemplate: false)
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query AllPagesQuery {
    pages {
      nodes {
        uri
      }
    }
  }
`;
