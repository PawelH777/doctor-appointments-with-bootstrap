export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, inputs, inputName) => {
  let isValid = true
  const validation = inputs[inputName].validation
  if (!validation) {
    return true
  }

  validation.errors.length = 0

  const requiredRule = validation.rules.required
  if (requiredRule) {
    isValid = value.trim() !== '' && isValid
    if (!isValid) {
      validation.errors.push(requiredRule.errorMessage)
    }
  }

  const minLengthRule = validation.rules.minLength
  if (minLengthRule) {
    isValid = value.length >= minLengthRule.value && isValid
    if (!isValid) {
      validation.errors.push(minLengthRule.errorMessage + minLengthRule.value)
    }
  }

  const maxLengthRule = validation.rules.maxLength
  if (maxLengthRule) {
    isValid = value.length <= maxLengthRule.value && isValid
    if (!isValid) {
      validation.errors.push(maxLengthRule.errorMessage + maxLengthRule.value)
    }
  }

  const isEmailRule = validation.rules.isEmail
  if (isEmailRule) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
    if (!isValid) {
      validation.errors.push(isEmailRule.errorMessage)
    }
  }

  const isNumericRule = validation.rules.isNumeric
  if (isNumericRule) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
    if (!isValid) {
      validation.errors.push(isNumericRule.errorMessage)
    }
  }

  const mustMatchRule = validation.rules.mustMatch
  if (mustMatchRule) {
    const input = inputs[mustMatchRule.inputName]
    const mustMatchErrorMessageOfToMatchInput =
      input.validation.rules.mustMatch.errorMessage
    const valueToMatch = input.attributes.value
    if (value !== valueToMatch) {
      validation.errors.push(mustMatchRule.errorMessage)
    } else if (
      input.validation.errors.includes(mustMatchErrorMessageOfToMatchInput)
    ) {
      filterOutErrorMessage(input, mustMatchErrorMessageOfToMatchInput)
    }
  }

  return isValid
}

const filterOutErrorMessage = (input, errorMessage) => {
  const errorsFromToMatchInputCopy = [...input.validation.errors]
  const filteredErrorsFromToMatchInput = errorsFromToMatchInputCopy.filter(
    err => err !== errorMessage
  )
  input.validation.errors = [...filteredErrorsFromToMatchInput]
}
