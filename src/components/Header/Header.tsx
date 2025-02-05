import Navigation from './Navigation';
import Logo from './Logo';
import Burger from '../ui/Burger/Burger';
const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-[100] flex justify-between items-center p-2 bg-black bg-opacity-30 backdrop-blur-md">
      <Logo />
      <Navigation />
      <Burger />
    </header>
  );
};

export default Header;
