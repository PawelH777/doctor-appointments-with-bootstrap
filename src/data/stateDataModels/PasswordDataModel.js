export const passwordDataModel = withMustMatchCheck => {
  let rules = {
    rules: {
      required: {
        errorMessage: 'Password is required'
      }
    }
  }

  if (withMustMatchCheck) {
    rules = {
      rules: {
        required: {
          errorMessage: 'Password is required'
        },
        mustMatch: {
          inputName: 'repeatedPassword',
          errorMessage: 'The password must match'
        }
      }
    }
  }

  return {
    label: {
      for: 'password',
      value: 'Password'
    },
    attributes: {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      value: ''
    },
    validation: {
      rules,
      errors: [],
      isValid: false
    }
  }
}
