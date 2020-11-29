export class LastNameDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'lastName',
      value: 'Last name'
    }

    this.attributes = {
      id: 'lastName',
      type: 'text',
      placeholder: 'Last name',
      value: ''
    }

    this.validation = {
      rules: {
        required: {
          errorMessage: 'Last name is required'
        }
      },
      errors: [],
      isValid: false
    }
  }
}
