export const EmailDataModel = {
  label: {
    for: 'email',
    value: 'Your e-mail'
  },
  attributes: {
    id: 'email',
    type: 'email',
    placeholder: 'Your e-mail',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'E-mail is required'
      },
      isEmail: {
        errorMessage: 'Wrong format'
      }
    },
    errors: [],
    isValid: false
  }
}
