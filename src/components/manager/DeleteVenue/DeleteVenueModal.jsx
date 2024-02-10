import PropTypes from 'prop-types';
import Modal from '../../../utils/modal';
import useAuthStore from '../../../store/authStore';
import deleteVenue from '../../../services/api/deleteVenue';

const DeleteVenueModal = ({ isOpen, onClose, onDelete, venueId }) => {
  const { token } = useAuthStore();

  const handleDelete = async () => {
    try {
      await deleteVenue(venueId, token);
      onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-sm mx-auto'>
        <h1 className='text-lg font-semibold mb-4 text-gray-900'>
          Do you want to delete this venue?
        </h1>
        <div className='flex flex-col space-y-3'>
          <button
            onClick={onClose}
            className='bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors'
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors'
          >
            Delete Venue
          </button>
        </div>
      </div>
    </Modal>
  );
};

DeleteVenueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  venueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DeleteVenueModal;
