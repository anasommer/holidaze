import DropdownMenuItem from './DropDownMenuItem';
import PropTypes from 'prop-types';

const UserDropDownMenu = ({
  isVenueManager,
  handleDropdownItemClick,
  handleLogout,
}) => (
  <div className='absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-50'>
    <div className='absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-md shadow-xl z-50'>
      <DropdownMenuItem onClick={() => handleDropdownItemClick('/profile')}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleDropdownItemClick('/bookings')}>
        Your Bookings
      </DropdownMenuItem>
      {isVenueManager && (
        <>
          <div className='border-t border-amber-400 my-1'></div>
          <DropdownMenuItem onClick={() => handleDropdownItemClick('/create')}>
            Create Venue
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDropdownItemClick('/manage-venues')}
          >
            Manage Venues
          </DropdownMenuItem>
        </>
      )}
      <div className='border-t border-amber-400 my-1'></div>
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </div>
  </div>
);

UserDropDownMenu.propTypes = {
  isVenueManager: PropTypes.bool.isRequired,
  handleDropdownItemClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default UserDropDownMenu;
