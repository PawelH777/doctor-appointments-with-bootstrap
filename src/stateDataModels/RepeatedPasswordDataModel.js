export const RepeatedPasswordDataModel = {
  label: {
    for: 'repeatedPassword',
    value: 'Repeat the password'
  },
  attributes: {
    id: 'repeatedPassword',
    type: 'password',
    placeholder: 'Repeat the password',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'You need repeat the password'
      },
      mustMatch: {
        inputName: 'password',
        errorMessage: 'The password must match'
      }
    },
    errors: [],
    isValid: false
  }
}
