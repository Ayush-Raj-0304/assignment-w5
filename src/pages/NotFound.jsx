import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Oops! The page you're looking for seems to have vanished into thin air.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
      >
        <BsArrowLeft size={20} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 