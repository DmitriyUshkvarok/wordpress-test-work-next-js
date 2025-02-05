export const formatTitle = (slug: string) => {
  if (slug === '/') return 'Home';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
