import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError){
  const validationErrors: Errors = {};
  err.inner.forEach(errors => {
    validationErrors[errors.path || 'key'] = errors.message;
  })

  return validationErrors;
}