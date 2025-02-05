import Image from 'next/image';
import Link from 'next/link';
const Logo = () => {
  return (
    <div>
      <Link href='/'>
        <Image src="/logo.webp" alt="site logo" width={65} height={65} />
      </Link>
    </div>
  );
};

export default Logo;
