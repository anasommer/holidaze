import * as yup from 'yup';

const schema = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_]*$/,
      'Name must not contain punctuation symbols apart from underscore (_).'
    )
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/,
      'Email must be a valid stud.noroff.no or noroff.no email address'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  avatar: yup.string().url('Invalid URL format'),
  venueManager: yup.boolean(),
});

const createVenueSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  media: yup
    .array()
    .nullable()
    .transform((value, originalValue) =>
      Array.isArray(originalValue)
        ? originalValue
        : value
        ? [value]
        : [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=4170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          ]
    )
    .optional(),

  rating: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? 0 : value))
    .optional(),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  maxGuests: yup
    .number()
    .required('Max Guests is required')
    .positive('Max Guests must be a positive number'),

  meta: yup.object({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    lat: yup.number().min(-90).max(90),
    lng: yup.number().min(-180).max(180),
  }),
});

export { schema, createVenueSchema };
