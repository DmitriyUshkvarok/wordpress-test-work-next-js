import { gql } from '@apollo/client';
import { getClient } from '@/lib/client';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/components/BlockRender';
import { cleanAndTransformBlocks } from '@/utils/cleanAndTransformBlocks';

const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: String!) {
    pageBy(uri: $uri) {
      id
      title
      blocks(postTemplate: false)
    }
  }
`;

export default async function Page() {
  const uri = '/';
  const client = getClient();
  const { data } = await client.query({
    query: GET_PAGE_BY_URI,
    variables: { uri },
  });

  if (!data?.pageBy) {
    notFound();
  }
  const blocksWithIds = cleanAndTransformBlocks(data.pageBy.blocks || []);

  return (
    <div>
      <BlockRenderer blocks={blocksWithIds} />
    </div>
  );
}
