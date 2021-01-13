import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import FormInput from './FormInput'
import { NameDataModel } from '../../data/inputsDataModels/NameDataModel'
import { ContentDataModel } from '../../data/inputsDataModels/ContentDataModel'
import { NumberDataModel } from '../../data/inputsDataModels/NumberDataModel'

configure({ adapter: new Adapter() })

const EXPECTED_NAME_LABEL_PROPERTIES = new NameDataModel().label
const EXPECTED_NAME_ATTRIBUTES_PROPERTIES = new NameDataModel().attributes

const EXPECTED_CONTENT_LABEL_PROPERTIES = new ContentDataModel().label
const EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES = new ContentDataModel().attributes

const numberRules = new NumberDataModel().validation.rules
const EXPECTED_IS_NUMBER_ERROR_MESSAGE = numberRules.isNumber.errorMessage
const EXPECTED_MAX_LENGTH_ERROR_MESSAGE = numberRules.maxLength.errorMessage
const EXPECTED_MIN_LENGTH_ERROR_MESSAGE = numberRules.minLength.errorMessage
const EXPECTED_REQUIRED_ERROR_MESSAGE = numberRules.required.errorMessage

describe('<FormInput /> unit tests', () => {
  it('should render input without errors and working change handler', () => {
    // given
    const mockedValueChangedHandler = jest.fn()

    // when
    const wrapper = shallow(
      <FormInput
        label={EXPECTED_NAME_LABEL_PROPERTIES}
        attributes={EXPECTED_NAME_ATTRIBUTES_PROPERTIES}
        errors={[]}
        valueChanged={mockedValueChangedHandler}
      />
    )

    // then
    const actualInput = wrapper.find(
      'input#' + EXPECTED_NAME_ATTRIBUTES_PROPERTIES.id
    )
    expect(actualInput).toBeDefined()
    expect(actualInput.prop('type')).toBe(
      EXPECTED_NAME_ATTRIBUTES_PROPERTIES.type
    )
    expect(actualInput.prop('placeholder')).toBe(
      EXPECTED_NAME_ATTRIBUTES_PROPERTIES.placeholder
    )
    expect(actualInput.prop('value')).toBe(
      EXPECTED_NAME_ATTRIBUTES_PROPERTIES.value
    )
    expect(actualInput.prop('onChange')).toBeDefined()

    const actualLabel = wrapper.find('label')
    expect(actualLabel).toBeDefined()
    expect(actualLabel.prop('htmlFor')).toBe(EXPECTED_NAME_LABEL_PROPERTIES.for)
    expect(actualLabel.text()).toBe(EXPECTED_NAME_LABEL_PROPERTIES.value)
  })

  it('should render textarea without errors', () => {
    // given

    const mockedValueChangedHandler = jest.fn()

    // when
    const wrapper = shallow(
      <FormInput
        label={EXPECTED_CONTENT_LABEL_PROPERTIES}
        attributes={EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES}
        errors={[]}
        valueChanged={mockedValueChangedHandler}
      />
    )

    // then
    const actualTextarea = wrapper.find(
      'textarea#' + EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES.id
    )
    expect(actualTextarea).toBeDefined()
    expect(actualTextarea.prop('rows')).toBe(
      EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES.rows
    )
    expect(actualTextarea.prop('placeholder')).toBe(
      EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES.placeholder
    )
    expect(actualTextarea.prop('value')).toBe(
      EXPECTED_CONTENT_ATTRIBUTES_PROPERTIES.value
    )
    expect(actualTextarea.prop('onChange')).toBeDefined()

    const actualLabel = wrapper.find('label')
    expect(actualLabel).toBeDefined()
    expect(actualLabel.prop('htmlFor')).toBe(
      EXPECTED_CONTENT_LABEL_PROPERTIES.for
    )
    expect(actualLabel.text()).toBe(EXPECTED_CONTENT_LABEL_PROPERTIES.value)
  })

  it('should render input with errors', () => {
    // given
    const numberLabel = new NumberDataModel().label
    const numberAttributes = new NumberDataModel().attributes
    const numberErrors = [
      EXPECTED_IS_NUMBER_ERROR_MESSAGE,
      EXPECTED_MAX_LENGTH_ERROR_MESSAGE,
      EXPECTED_MIN_LENGTH_ERROR_MESSAGE,
      EXPECTED_REQUIRED_ERROR_MESSAGE
    ]

    // when
    const wrapper = shallow(
      <FormInput
        label={numberLabel}
        attributes={numberAttributes}
        errors={numberErrors}
      />
    )

    // then
    const actualErrorElements = wrapper.find('small.text-danger')
    expect(actualErrorElements).toHaveLength(4)

    const actualErrorMessages = []
    actualErrorElements.forEach(errorElement => {
      actualErrorMessages.push(errorElement.text())
    })

    expect(actualErrorMessages).toContain(EXPECTED_IS_NUMBER_ERROR_MESSAGE)
    expect(actualErrorMessages).toContain(EXPECTED_MAX_LENGTH_ERROR_MESSAGE)
    expect(actualErrorMessages).toContain(EXPECTED_MIN_LENGTH_ERROR_MESSAGE)
    expect(actualErrorMessages).toContain(EXPECTED_REQUIRED_ERROR_MESSAGE)
  })
})
