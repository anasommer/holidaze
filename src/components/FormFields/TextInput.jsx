import PropTypes from 'prop-types';

const TextInput = ({
  register,
  name,
  label,
  errors,
  placeholder,
  type = 'text',
  isRequired = false,
}) => (
  <div className='mb-4 lg:max-w-[80%] m-auto'>
    <label
      className='block text-gray-700 text-sm font-bold mb-2'
      htmlFor={name}
    >
      {label} {isRequired && <span className='text-red-500'>*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        {...register(name)}
        id={name}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[name] ? 'border-red-500' : ''
        }`}
      />
    ) : (
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[name] ? 'border-red-500' : ''
        }`}
      />
    )}
    {errors[name] && (
      <p className='text-red-500 text-xs italic'>{errors[name].message}</p>
    )}
  </div>
);

TextInput.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
};

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  isRequired: false,
  errors: {},
};

export default TextInput;
