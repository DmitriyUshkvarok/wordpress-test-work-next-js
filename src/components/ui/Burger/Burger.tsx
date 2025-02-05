'use client';
import MobileMenu from '@/components/MobileMenu';
import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
const Burger = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="block  md:hidden">
      <Hamburger toggled={isOpen} toggle={toggleMenu} color="#be185d" />
      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Burger;
