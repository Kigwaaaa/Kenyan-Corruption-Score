import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-kenya-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-kenya-red">
            Kenya Finance Watch
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-kenya-red transition-colors">
              Home
            </Link>
            <Link to="/ministries" className="hover:text-kenya-red transition-colors">
              Ministries
            </Link>
            <Link to="/about" className="hover:text-kenya-red transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 