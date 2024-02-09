const DropdownMenuItem = ({ onClick, children }) => (
  <li
    onClick={onClick}
    className='block px-4 py-2 text-sm bg-gray-800 text-neutral-100 hover:bg-amber-300 hover:text-black cursor-pointer'
  >
    {children}
  </li>
);

export default DropdownMenuItem;
