const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={handleOutsideClick}
    >
      <div
        className='p-4 rounded-lg relative w-[60%]'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
