export const NumberDataModel = {
  label: {
    for: 'number',
    value: 'Your number'
  },
  attributes: {
    id: 'number',
    type: 'number',
    placeholder: 'Your number',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'Number is required'
      },
      isNumber: {
        errorMessage: 'Should be numeric'
      },
      minLength: {
        errorMessage: 'Min length is ',
        value: 9
      },
      maxLength: {
        errorMessage: 'Max length is ',
        value: 9
      }
    },
    errors: [],
    isValid: false
  }
}
