export class TitleDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'title',
      value: 'Title'
    }

    this.attributes = {
      id: 'title',
      type: 'text',
      placeholder: 'Title',
      value: ''
    }

    this.validation = {
      rules: {
        required: {
          errorMessage: 'Title is required'
        }
      },
      errors: [],
      isValid: false
    }
  }
}
