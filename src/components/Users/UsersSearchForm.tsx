import * as React from 'react';
import { Formik, FormikHelpers, FormikErrors, Field } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";

const usersSearchFormValidate = (values: FormType) => {
  const errors: FormikErrors<FormType> = {}
  return errors;
}

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
  term: string
  friend: FriendFormType
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter)
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
      enableReinitialize
      initialValues={
        {
          term: filter.term,
          friend: String(filter.friend) as FriendFormType
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