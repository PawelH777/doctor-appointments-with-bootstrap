export const NameDataModel = {
  label: {
    for: 'name',
    value: 'First name'
  },
  attributes: {
    id: 'name',
    type: 'text',
    placeholder: 'Name',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'Name is required'
      }
    },
    errors: [],
    isValid: false
  }
}
