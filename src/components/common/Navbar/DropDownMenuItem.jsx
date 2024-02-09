import PropTypes from 'prop-types';

const DropdownMenuItem = ({ onClick, children }) => (
  <li
    onClick={onClick}
    className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black cursor-pointer'
  >
    {children}
  </li>
);

DropdownMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DropdownMenuItem;
