import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ListItemCustom from './ListItem'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

configure({ adapter: new Adapter() })

describe('<ListItem />', () => {
  it('should render list item with passing correct values', () => {
    // given
    const expectedPaperCssProp = 'paperCss'
    const expectedIsButtonProp = true
    const expectedIsDisabledProp = false
    const expectedOnClickProp = () => true
    const expectedPrimaryProp = 'Primary text'
    const expectedSecondaryProp = 'Secondary text'

    // when
    const wrapper = shallow(
      <ListItemCustom
        paperCss={expectedPaperCssProp}
        isButton={expectedIsButtonProp}
        isDisabled={expectedIsDisabledProp}
        clicked={expectedOnClickProp}
        primary={expectedPrimaryProp}
        secondary={expectedSecondaryProp}
      />
    )

    // then
    const actualPaperElement = wrapper.find(Paper)
    expect(actualPaperElement).toBeDefined()
    expect(actualPaperElement.prop('className')).toBe(expectedPaperCssProp)

    const actualListItem = actualPaperElement.find(ListItem)
    expect(actualListItem).toBeDefined()
    expect(actualListItem.prop('button')).toBe(expectedIsButtonProp)
    expect(actualListItem.prop('disabled')).toBe(expectedIsDisabledProp)
    expect(actualListItem.prop('onClick')).toBe(expectedOnClickProp)

    const actualListItemText = actualListItem.find(ListItemText)
    expect(actualListItemText).toBeDefined()
    expect(actualListItemText.prop('primary')).toBe(expectedPrimaryProp)
    expect(actualListItemText.prop('secondary')).toBe(expectedSecondaryProp)
  })
})
