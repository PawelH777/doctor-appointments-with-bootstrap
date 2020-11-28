export const TitleDataModel = {
  label: {
    for: 'title',
    value: 'Title'
  },
  attributes: {
    id: 'title',
    type: 'text',
    placeholder: 'Title',
    value: ''
  },
  validation: {
    rules: {
      required: {
        errorMessage: 'Title is required'
      }
    },
    errors: [],
    isValid: false
  }
}
