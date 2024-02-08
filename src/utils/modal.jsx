const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-4 rounded-lg relative'>
        {showCloseButton && (
          <button
            onClick={onClose}
            className='absolute top-0 right-0 text-2xl font-semibold p-2 leading-none text-gray-600 hover:text-gray-900'
            aria-label='Close'
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
