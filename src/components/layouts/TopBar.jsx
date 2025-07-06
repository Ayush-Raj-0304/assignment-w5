import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#121212] sticky top-0 z-10 px-6 py-4 flex items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90"
        >
          <IoIosArrowBack className="text-white text-xl" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90"
        >
          <IoIosArrowForward className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TopBar; 