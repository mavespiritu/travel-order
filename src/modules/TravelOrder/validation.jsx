import * as Yup from 'yup'

export const initialValues = {
  record: {
    TO_subject: '',
    date_from: '',
    date_to: '',
    type_of_travel: '',
    otherpassenger: '',
    othervehicle: '',
    otherdriver: '',
    vehicles: [],
    locations: [],
    staffs: [],
  }
}

export const validationSchema = Yup.object({
  record: Yup.object({
    TO_subject: Yup.string().nullable().required('Purpose is required'),
    date_from: Yup.string().nullable().required('Start date of travel is required'),
    date_to: Yup.date().nullable().required('End date of travel is required'),
    withVehicle: Yup.string().nullable().required('Vehicle request is required'),
    type_of_travel: Yup.string().nullable().required('Travel type is required'),
    // staffs: Yup.array().min(1, 'At least 1 staff is required').required('Please add deployed staffs'),
    //staffs: Yup.array(),
    vehicles: Yup.array().of(
      Yup.object().shape({
        vehicle: Yup.string().required('Vehicle is required'),
        driver: Yup.string().required('Driver is required'),
      })
    ),
    locations: Yup.array().of(
      Yup.object().shape({
        region: Yup.string().required('Region is required'),
        province: Yup.string().required('Province is required'),
        citymun: Yup.string().required('City/Municipality is required'),
        specificLocation: Yup.string().required('Location is required'),
      })
    ),
    delete_locations: Yup.array(),
    staffs: Yup.array().of(
      Yup.object().shape({
        emp_id: Yup.string().required('Staff is required'),
      })
    ),
  })
})