import React from 'react'
import s from './FormsControls.module.css'
import { Field, WrappedFieldProps } from 'redux-form'
import { FieldValidator } from '../../../utils/validators/validators'

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')} >
      <div>
        <textarea {...input} {...props} />
      </div>
      {
        hasError && <span>{error} </span>}
    </div>
  )
}

export const Input: React.FC<WrappedFieldProps> = ({ input, meta: { touched, error }, ...props }) => {
  const hasError = touched && error
  return (
    <div className={s.formControl + ' ' + (hasError ? s.error : '')} >
      <div>
        <input {...input} {...props} autoComplete="on" />
      </div>
      {
        hasError && <span>{error} </span>}
    </div>
  )
}

export function CreateField<FormKeysType extends string>(placeholder: string | null,
  name: FormKeysType,
  validators: Array<FieldValidator>,
  component: React.FC<WrappedFieldProps>, props = {}, text = "") {
  return <div>
    <Field placeholder={placeholder}
      name={name}
      component={component}
      validate={validators}
      {...props} />{text}
  </div>
}






