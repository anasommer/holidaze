import Modal from '../../../utils/modal';
import API_URL from '../../../utils/constants';
import useAuthStore from '../../../store/authStore';

const DeleteVenueModal = ({ isOpen, onClose, onDelete, venueId }) => {
  const { token } = useAuthStore();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}venues/${venueId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the venue');
      }

      onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-sm mx-auto'>
        {' '}
        {/* Adjusted for Tailwind's color palette */}
        <h1 className='text-lg font-semibold mb-4 text-gray-900'>
          Do you want to delete this venue?
        </h1>
        <div className='flex flex-col space-y-3'>
          <button
            onClick={onClose} // Close the modal without deleting
            className='bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors'
          >
            No
          </button>
          <button
            onClick={handleDelete} // Proceed with deletion and close the modal
            className='bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors'
          >
            Delete Venue
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteVenueModal;
