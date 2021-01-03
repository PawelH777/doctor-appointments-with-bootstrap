export class RepeatedPasswordDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'repeatedPassword',
      value: 'Repeat the password'
    }

    this.attributes = {
      id: 'repeatedPassword',
      type: 'password',
      placeholder: 'Repeat the password',
      value: ''
    }

    this.validation = {
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
}
