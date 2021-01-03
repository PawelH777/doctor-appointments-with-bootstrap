import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Divider from '@material-ui/core/Divider'
import flushPromises from 'flush-promises'

import Contact from './Contact'
import Form from '../../Form/Form'
import Map from '../../../components/Map/Map'
import { EmailDataModel } from '../../../data/stateDataModels/EmailDataModel'
import { ContentDataModel } from '../../../data/stateDataModels/ContentDataModel'
import { TitleDataModel } from '../../../data/stateDataModels/TitleDataModel'
import axios from '../../../axios-doctor-appointments'

configure({ adapter: new Adapter() })

jest.mock('../../../axios-doctor-appointments')

describe('<Contact /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render Contact component', () => {
    // given

    // when
    const wrapper = mount(<Contact />)

    // then
    expect(wrapper.find(Map)).toHaveLength(1)

    const actualDivider = wrapper.find(Divider)
    expect(actualDivider).toHaveLength(1)
    expect(actualDivider.prop('orientation')).toBe('vertical')
    expect(actualDivider.prop('flexItem')).toBe(true)

    const actualAuthorInfoSection = wrapper.find('div#authorInfo')

    const actualHighlightedText = []
    actualAuthorInfoSection
      .find('h4')
      .forEach(highlightedText =>
        actualHighlightedText.push(highlightedText.text())
      )

    expect(actualHighlightedText).toHaveLength(3)
    expect(actualHighlightedText).toContain('Doctor Pawel Hornik')
    expect(actualHighlightedText).toContain('631-601 Morse Ave')
    expect(actualHighlightedText).toContain('Sunnyvale, CA 94085')

    const actualMessageForm = actualAuthorInfoSection.find(Form)
    expect(actualMessageForm).toHaveLength(1)
    expect(actualMessageForm.prop('submitted')).toBeDefined()

    const actualPassedInputs = actualMessageForm.prop('inputs')
    expect(actualPassedInputs).toBeDefined()
    expect(actualPassedInputs.email).toMatchObject(new EmailDataModel())
    expect(actualPassedInputs.title).toMatchObject(new TitleDataModel())
    expect(actualPassedInputs.content).toMatchObject(new ContentDataModel())
  })

  it('should submit message method be performed correctly without errors', async () => {
    // given
    window.alert = jest.fn()
    window.location.reload = jest.fn()

    axios.post.mockImplementation(() => Promise.resolve())

    const submitMethodArguments = {
      email: {
        attributes: {
          value: 'Email test value'
        }
      },
      title: {
        attributes: {
          value: 'Title test value'
        }
      },
      content: {
        attributes: {
          value: 'Content test value'
        }
      }
    }

    // when
    const wrapper = mount(<Contact />)
    await wrapper
      .find(Form)
      .props()
      .submitted(submitMethodArguments)

    // then
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('/messages.json', {
      content: 'Content test value',
      email: 'Email test value',
      title: 'Title test value'
    })

    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('Message has been send.')
    expect(window.location.reload).toHaveBeenCalledTimes(1)
  })

  it('should submit message method be performed correctly but with error', async () => {
    // given
    window.alert = jest.fn()
    window.location.reload = jest.fn()
    console.log = jest.fn()

    axios.post.mockImplementation(() => Promise.reject('400 Error'))

    const submitMethodArguments = {
      email: {
        attributes: {
          value: 'Email test value'
        }
      },
      title: {
        attributes: {
          value: 'Title test value'
        }
      },
      content: {
        attributes: {
          value: 'Content test value'
        }
      }
    }

    // when
    const wrapper = mount(<Contact />)
    await wrapper
      .find(Form)
      .props()
      .submitted(submitMethodArguments)
    await flushPromises(setImmediate)

    // then
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('/messages.json', {
      content: 'Content test value',
      email: 'Email test value',
      title: 'Title test value'
    })

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('400 Error')

    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith(
      "Message couldn't be sent because of the issue."
    )
    expect(window.location.reload).toHaveBeenCalledTimes(1)
  })
})
