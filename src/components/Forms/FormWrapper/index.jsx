import { setNestedObjectValues } from "formik"
import PrimaryButton from '../../Buttons/Primary'
import SecondaryButton from '../../Buttons/Secondary'

const FormWrapper = ({
  onEdit,
  title,
  validateForm,
  setTouched,
  setConfirm,
  requiredFields,
  handleClose,
  isSubmitting,
  trigger = null,
  children,
}) => {

  const handleClick = () => {
    validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        setTouched(setNestedObjectValues(errors, true))
      } else {
        setConfirm(true)
      }
      requiredFields(errors)
    })
  }

  return (
    <div>
      <div className="text-slate-700 font-semibold mb-4">{title}</div>
      <form autoComplete='off' noValidate>
        <div className="space-y-4 pt-6">
          {children}
          <div className="flex pt-6">
            <SecondaryButton label={`${onEdit?'Close':'Cancel'}`} handleClick={handleClose} />
            <PrimaryButton handleClick={handleClick} trigger={trigger} label={`${onEdit?'Update':'Save'}`} submitting={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormWrapper