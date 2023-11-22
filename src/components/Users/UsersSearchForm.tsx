import * as React from 'react';
import { Formik, FormikHelpers, FormikErrors, Field } from 'formik';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: FormType) => {
  const errors: FormikErrors<FormType> = {}
  return errors;
}

type FormType = {
  term: string
  friend: 'true' | 'false' | 'null'
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter)
    setSubmitting(false)
  }


  return <div>
    <Formik
      initialValues={
        {
          term: '',
          friend: 'null'
        }}
      validate={usersSearchFormValidate}
      onSubmit={submit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field type='text' name='term' />
          <Field name='friend' as='select' placeholder=''>
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </form>
      )}
    </Formik>

  </div >
})