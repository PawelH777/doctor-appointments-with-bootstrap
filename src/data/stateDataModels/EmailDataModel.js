export class EmailDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'email',
      value: 'Your e-mail'
    }
    this.attributes = {
      id: 'email',
      type: 'email',
      placeholder: 'Your e-mail',
      value: ''
    }
    this.validation = {
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
}
