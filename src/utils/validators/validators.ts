export type FieldValidator = (value: string) => string | undefined

export const required: FieldValidator = (value) => {
  if (value) return undefined
  return 'Field is required'

}

export const maxLengthCreator = (maxLength: number): FieldValidator => (value) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`
}



