import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Spinner from './Spinner'

configure({ adapter: new Adapter() })

describe('<Spinner /> unit tests', () => {
  it('should render spinner', () => {
    // given

    // when
    const wrapper = shallow(<Spinner />)

    // then
    const actualSpinner = wrapper.find('.spinner-border')
    expect(actualSpinner).toHaveLength(1)
    expect(actualSpinner.text()).toBe('Loading...')
  })
})
