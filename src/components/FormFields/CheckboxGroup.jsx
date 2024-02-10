import PropTypes from 'prop-types';

const CheckboxOption = ({ register, name, label }) => (
  <div className='flex items-center'>
    <input
      type='checkbox'
      className='form-checkbox h-5 w-5 text-amber-600 mr-2'
      {...register(name)}
    />
    <span className='text-gray-700'>{label}</span>
  </div>
);

const CheckboxGroup = ({ register }) => {
  const facilitiesOptions = [
    { name: 'meta.wifi', label: 'Wifi' },
    { name: 'meta.breakfast', label: 'Breakfast' },
    { name: 'meta.parking', label: 'Parking' },
    { name: 'meta.pets', label: 'Pets' },
  ];

  return (
    <div className='mb-4 lg:max-w-[80%] m-auto'>
      <div className='block text-gray-700 text-sm font-bold mb-2'>
        Facilities
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {facilitiesOptions.map((option, index) => (
          <CheckboxOption
            key={index}
            register={register}
            name={option.name}
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
};

CheckboxGroup.propTypes = {
  register: PropTypes.func.isRequired,
};

export default CheckboxGroup;
