import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function getClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export default client;
