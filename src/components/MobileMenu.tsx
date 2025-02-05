'use client';

import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_ALL_PAGES } from '@/graphql/services';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { formatTitle } from '@/utils/formatTitle';
import { useState } from 'react';

const sortOrder = [
  '/',
  'about',
  'partnership',
  'buying',
  'selling',
  'contact-us',
];

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const { data } = useQuery(GET_ALL_PAGES);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const pageRoutes =
    data?.pages?.nodes?.map((node: { uri: string }) => {
      const slugParts =
        node.uri === '/' ? ['/'] : node.uri.split('/').filter(Boolean);
      return { slug: slugParts };
    }) || [];

  const groupedRoutes = pageRoutes.reduce(
    (acc: { [key: string]: string[] }, route: { slug: string[] }) => {
      const [parent, child] = route.slug;
      if (child) {
        if (!acc[parent]) acc[parent] = [];
        acc[parent].push(child);
      } else {
        acc[parent] = acc[parent] || [];
      }
      return acc;
    },
    {}
  );

  const sortedRoutes = Object.keys(groupedRoutes).sort(
    (a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
  );

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-72 overflow-y-auto bg-gray-900 min-h-screen backdrop-blur-md shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <Hamburger toggled={isOpen} toggle={onClose} color="#be185d" />
      </div>
      <ul className="py-4 flex flex-col gap-3 px-6">
        {sortedRoutes.map((parent) => (
          <li key={parent} className="w-full">
            {groupedRoutes[parent].length > 0 ? (
              <DropdownMenu
                open={openDropdown === parent}
                onOpenChange={(isOpen) =>
                  setOpenDropdown(isOpen ? parent : null)
                }
              >
                <DropdownMenuTrigger className="px-4 text-gray-700 text-left text-lg font-semibold hover:text-pink-700 cursor-pointer">
                  {formatTitle(parent)}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-black bg-opacity-70 backdrop-blur-md p-2 relative z-[100]">
                  {groupedRoutes[parent].map((child: string) => (
                    <DropdownMenuItem
                      key={child}
                      className="cursor-pointer"
                      asChild
                    >
                      <Link
                        href={`/${parent}/${child}`}
                        className="block w-full px-4 py-2 text-gray-700 data-[highlighted]:text-pink-700"
                        onClick={() => {
                          onClose();
                          setOpenDropdown(null);
                        }}
                      >
                        {formatTitle(child)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={`/${parent}`}
                className={`block w-full px-4 py-2 text-lg font-semibold text-gray-700 hover:text-pink-700 ${
                  pathname === `/${parent}` ? 'text-red-600' : ''
                }`}
                onClick={onClose}
              >
                {formatTitle(parent)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
