import Modal from '../../../utils/modal';

const UpdateVenueModal = ({ isOpen, onClose, onUpdate }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Update venue information here.</p>

      <button
        onClick={onUpdate}
        className='bg-blue-500 text-white p-2 rounded mt-2'
      >
        Update
      </button>
    </Modal>
  );
};

export default UpdateVenueModal;
