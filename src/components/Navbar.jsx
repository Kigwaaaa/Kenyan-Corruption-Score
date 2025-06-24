import React from 'react';
import kenyaFlag from '../assets/kenya-flag.svg';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-kenya-white py-2">
      <div className="container mx-auto flex justify-center items-center h-16">
        <img src={kenyaFlag} alt="Kenyan Flag" className="h-12 w-auto object-contain" />
      </div>
    </nav>
  );
};

export default Navbar; 