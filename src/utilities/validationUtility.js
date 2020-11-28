export const checkValidity = (valueToCheck, inputs, inputName) => {
  let isValid = true
  const validation = inputs[inputName].validation
  if (!validation) {
    return true
  }

  validation.errors.length = 0

  isValid = checkRequiredRule(validation, valueToCheck) && isValid

  isValid = checkMinLengthRule(validation, valueToCheck) && isValid

  isValid = checkMaxLengthRule(validation, valueToCheck) && isValid

  isValid = checkIsEmailRule(validation, valueToCheck) && isValid

  isValid = checkIsNumericRule(validation, valueToCheck) && isValid

  isValid = checkMustMatchRule(validation, valueToCheck, inputs) && isValid

  return isValid
}

const checkRequiredRule = (validation, value) => {
  const requiredRule = validation.rules.required
  if (requiredRule) {
    const valueExists = value.trim() !== ''
    if (!valueExists) {
      validation.errors.push(requiredRule.errorMessage)
      return false
    }
  }
  return true
}

const checkMinLengthRule = (validation, value) => {
  const minLengthRule = validation.rules.minLength
  if (minLengthRule) {
    const isLongerThanMinLength = value.length >= minLengthRule.value
    if (!isLongerThanMinLength) {
      validation.errors.push(minLengthRule.errorMessage + minLengthRule.value)
      return false
    }
  }
  return true
}

const checkMaxLengthRule = (validation, value) => {
  const maxLengthRule = validation.rules.maxLength
  if (maxLengthRule) {
    const hasBelowMaxLength = value.length <= maxLengthRule.value
    if (!hasBelowMaxLength) {
      validation.errors.push(maxLengthRule.errorMessage + maxLengthRule.value)
      return false
    }
  }
  return true
}

const checkIsEmailRule = (validation, value) => {
  const isEmailRule = validation.rules.isEmail
  if (isEmailRule) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const emailPatternDetected = pattern.test(value)
    if (!emailPatternDetected) {
      validation.errors.push(isEmailRule.errorMessage)
      return false
    }
  }
  return true
}

const checkIsNumericRule = (validation, value) => {
  const isNumericRule = validation.rules.isNumeric
  if (isNumericRule) {
    const pattern = /^\d+$/
    const isNumeric = pattern.test(value)
    if (!isNumeric) {
      validation.errors.push(isNumericRule.errorMessage)
      return false
    }
  }
  return true
}

const checkMustMatchRule = (validation, value, inputs) => {
  const mustMatchRule = validation.rules.mustMatch
  if (mustMatchRule) {
    const inputWithValueToMatch = inputs[mustMatchRule.inputName]
    const mustMatchErrorMessageOfToMatchInput =
      inputWithValueToMatch.validation.rules.mustMatch.errorMessage
    const valueToMatch = inputWithValueToMatch.attributes.value
    if (value !== valueToMatch) {
      validation.errors.push(mustMatchRule.errorMessage)
      return false
    } else if (
      wasErrorAlreadyDetected(
        inputWithValueToMatch,
        mustMatchErrorMessageOfToMatchInput
      )
    ) {
      filterOutErrorMessage(
        inputWithValueToMatch,
        mustMatchErrorMessageOfToMatchInput
      )
    }
  }
  return true
}

const wasErrorAlreadyDetected = (input, errorMessage) => {
  return input.validation.errors.includes(errorMessage)
}

const filterOutErrorMessage = (input, errorMessage) => {
  const errorsFromToMatchInputCopy = [...input.validation.errors]
  const filteredErrorsFromToMatchInput = errorsFromToMatchInputCopy.filter(
    err => err !== errorMessage
  )
  input.validation.errors = [...filteredErrorsFromToMatchInput]
}
