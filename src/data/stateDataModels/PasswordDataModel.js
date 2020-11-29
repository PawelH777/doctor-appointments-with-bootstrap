export class PasswordDataModel {
  label
  attributes
  validation
  #rules = {
    required: {
      errorMessage: 'Password is required'
    }
  }

  constructor (withMustMatchCheck) {
    if (withMustMatchCheck) {
      this.#rules = {
        required: {
          errorMessage: 'Password is required'
        },
        mustMatch: {
          inputName: 'repeatedPassword',
          errorMessage: 'The password must match'
        }
      }
    }

    this.label = {
      for: 'password',
      value: 'Password'
    }

    this.attributes = {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      value: ''
    }

    this.validation = {
      rules: this.#rules,
      errors: [],
      isValid: false
    }
  }
}
