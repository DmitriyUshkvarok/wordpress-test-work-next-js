import { getClient } from '@/lib/client';
import { GET_ALL_PAGES } from '@/graphql/services';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { formatTitle } from '@/utils/formatTitle';

interface PageRoute {
  slug: string[];
}

interface GroupedRoutes {
  [key: string]: string[];
}

const sortOrder = [
  '/',
  'about',
  'partnership',
  'buying',
  'selling',
  'contact-us',
];

const Navigation = async () => {
  const client = getClient();
  const { data } = await client.query({ query: GET_ALL_PAGES });

  const pageRoutes =
    data?.pages?.nodes?.map((node: { uri: string }) => {
      const slugParts =
        node.uri === '/' ? ['/'] : node.uri.split('/').filter(Boolean);
      return { slug: slugParts };
    }) || [];

  // Группировка маршрутов по родительским категориям

  const groupedRoutes = pageRoutes.reduce(
    (acc: GroupedRoutes, route: PageRoute) => {
      const [parent, child] = route.slug;
      if (child) {
        if (!acc[parent]) acc[parent] = [];
        acc[parent].push(child);
      } else {
        acc[parent] = acc[parent] || [];
      }
      return acc;
    },
    {} as GroupedRoutes
  );

  // Сортировка по заданному порядку
  const sortedRoutes = Object.keys(groupedRoutes).sort(
    (a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
  );

  return (
    <nav className="hidden md:flex space-x-4">
      {sortedRoutes.map((parent) => (
        <div key={parent} className="relative">
          {groupedRoutes[parent].length > 0 ? (
            <HoverCard openDelay={100} closeDelay={200}>
              <HoverCardTrigger
                tabIndex={0}
                className="font-heading text-gray-400 transition-colors duration-400 ease-in-out hover:text-pink-700 cursor-pointer"
              >
                {formatTitle(parent)}
              </HoverCardTrigger>
              <HoverCardContent className="bg-black bg-opacity-30 backdrop-blur-md shadow-lg p-2 rounded-md">
                <ul>
                  {groupedRoutes[parent].map((child: string) => (
                    <li key={child}>
                      <Link
                        href={`/${parent}/${child}`}
                        className="block px-4 py-2 font-heading text-gray-400 transition-colors duration-400 ease-in-out hover:text-pink-700 hover:bg-gray-100"
                      >
                        {formatTitle(child)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link
              href={`/${parent}`}
              className="font-heading text-gray-400 transition-colors duration-400 ease-in-out hover:text-pink-700"
            >
              {formatTitle(parent)}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
