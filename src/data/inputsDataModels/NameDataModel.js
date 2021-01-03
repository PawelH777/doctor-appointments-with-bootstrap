export class NameDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'name',
      value: 'First name'
    }

    this.attributes = {
      id: 'name',
      type: 'text',
      placeholder: 'Name',
      value: ''
    }

    this.validation = {
      rules: {
        required: {
          errorMessage: 'Name is required'
        }
      },
      errors: [],
      isValid: false
    }
  }
}
