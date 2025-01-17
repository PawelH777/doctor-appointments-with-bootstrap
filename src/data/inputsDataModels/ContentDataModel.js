export class ContentDataModel {
  label
  attributes
  validation

  constructor () {
    this.label = {
      for: 'content',
      value: 'Content'
    }

    this.attributes = {
      id: 'content',
      type: 'textarea',
      placeholder: 'Content',
      value: '',
      rows: 3
    }

    this.validation = {
      rules: {},
      errors: [],
      isValid: true
    }
  }
}
