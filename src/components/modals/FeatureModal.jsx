import { useEffect } from 'react';

const FeatureModal = ({ message, onClose, autoCloseDelay = 2000 }) => {
  useEffect(() => {
    if (autoCloseDelay) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoCloseDelay, onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#282828] px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in">
      <p className="text-white">{message}</p>
    </div>
  );
};

export default FeatureModal; 