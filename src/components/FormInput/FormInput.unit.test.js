import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import FormInput from './FormInput'
import { NameDataModel } from '../../data/stateDataModels/NameDataModel'
import { ContentDataModel } from '../../data/stateDataModels/ContentDataModel'
import { NumberDataModel } from '../../data/stateDataModels/NumberDataModel'

configure({ adapter: new Adapter() })

describe('<FormInput /> unit tests', () => {
  it('should render input without errors', () => {
    // given
    // Name is one of the data models characterizing the input element
    const nameLabel = new NameDataModel().label
    const nameAttributes = new NameDataModel().attributes

    // when
    const wrapper = shallow(
      <FormInput label={nameLabel} attributes={nameAttributes} errors={[]} />
    )

    // then
    const actualInput = wrapper.find('input#' + nameAttributes.id)
    expect(actualInput).toBeDefined()
    expect(actualInput.prop('type')).toBe(nameAttributes.type)
    expect(actualInput.prop('placeholder')).toBe(nameAttributes.placeholder)
    expect(actualInput.prop('value')).toBe(nameAttributes.value)
    expect(actualInput.prop('className')).toBe('form-control')
  })

  it('should render textarea without errors', () => {
    // given
    // Content is one of the data models characterizing the textarea element
    const contentLabel = new ContentDataModel().label
    const contentAttributes = new ContentDataModel().attributes

    // when
    const wrapper = shallow(
      <FormInput
        label={contentLabel}
        attributes={contentAttributes}
        errors={[]}
      />
    )

    // then
    const actualInput = wrapper.find('textarea#' + contentAttributes.id)
    expect(actualInput).toBeDefined()
    expect(actualInput.prop('rows')).toBe(contentAttributes.rows)
    expect(actualInput.prop('placeholder')).toBe(contentAttributes.placeholder)
    expect(actualInput.prop('value')).toBe(contentAttributes.value)
    expect(actualInput.prop('className')).toBe('form-control')
  })

  it('should render input with errors', () => {
    // given
    const numberLabel = new NumberDataModel().label
    const numberAttributes = new NumberDataModel().attributes
    const numberRules = new NumberDataModel().validation.rules
    const numberErrors = [
      numberRules.isNumber.errorMessage,
      numberRules.maxLength.errorMessage,
      numberRules.minLength.errorMessage,
      numberRules.required.errorMessage
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

    expect(actualErrorMessages).toContain(numberRules.isNumber.errorMessage)
    expect(actualErrorMessages).toContain(numberRules.maxLength.errorMessage)
    expect(actualErrorMessages).toContain(numberRules.minLength.errorMessage)
    expect(actualErrorMessages).toContain(numberRules.required.errorMessage)
  })
})
