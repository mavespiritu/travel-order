import * as Yup from 'yup';

export const initialValues = {
    email: '',
    password: '',
}

export const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

