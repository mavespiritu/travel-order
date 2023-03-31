import * as Yup from 'yup';

export const initialValues = {
    emp_id: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    ext_name: ''
}

export const validationSchema = Yup.object({
    emp_id: Yup.string().required('Employee ID is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    password_confirmation: Yup.string()
    .required('Please confirm password')
    .min(8, 'Your password is too short')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
})

