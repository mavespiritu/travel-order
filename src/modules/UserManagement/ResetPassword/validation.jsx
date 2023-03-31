import * as Yup from 'yup';

export const initialValues = {
    password: '',
    password_confirmation: '',

}

export const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').min(8, 'Your password is too short'),
    password_confirmation: Yup.string()
    .required('Please confirm password')
    .min(8, 'Your password is too short')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
})

