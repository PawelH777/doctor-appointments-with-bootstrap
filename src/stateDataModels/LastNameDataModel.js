export const LastNameDataModel = {
  label: {
    for: 'lastName',
    value: 'Last name'
  },
  attributes: {
    id: 'lastName',
    type: 'text',
    placeholder: 'Last name',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'Last name is required'
      }
    },
    errors: [],
    isValid: false
  }
}
