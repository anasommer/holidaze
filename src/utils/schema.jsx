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
  avatar: yup.string().url('Invalid URL format').notRequired(),
  venueManager: yup.boolean(),
});

export default schema;
