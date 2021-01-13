import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ListItemCustom from './ListItem'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

configure({ adapter: new Adapter() })

const EXPECTED_PAPER_CSS_PROP = 'paperCss'
const EXPECTED_IS_BUTTON_PROP = true
const EXPECTED_IS_DISABLED_PROP = false
const EXPECTED_ON_CLICK_PROP = () => true
const EXPECTED_PRIMARY_PROP = 'Primary text'
const EXPECTED_SECONDARY_PROP = 'Secondary text'

describe('<ListItem /> unit tests', () => {
  it('should render list item with passing correct values', () => {
    // given

    // when
    const wrapper = shallow(
      <ListItemCustom
        paperCss={EXPECTED_PAPER_CSS_PROP}
        isButton={EXPECTED_IS_BUTTON_PROP}
        isDisabled={EXPECTED_IS_DISABLED_PROP}
        clicked={EXPECTED_ON_CLICK_PROP}
        primary={EXPECTED_PRIMARY_PROP}
        secondary={EXPECTED_SECONDARY_PROP}
      />
    )

    // then
    const actualPaperElement = wrapper.find(Paper)
    expect(actualPaperElement).toBeDefined()
    expect(actualPaperElement.prop('className')).toBe(EXPECTED_PAPER_CSS_PROP)

    const actualListItem = actualPaperElement.find(ListItem)
    expect(actualListItem).toBeDefined()
    expect(actualListItem.prop('button')).toBe(EXPECTED_IS_BUTTON_PROP)
    expect(actualListItem.prop('disabled')).toBe(EXPECTED_IS_DISABLED_PROP)
    expect(actualListItem.prop('onClick')).toBe(EXPECTED_ON_CLICK_PROP)

    const actualListItemText = actualListItem.find(ListItemText)
    expect(actualListItemText).toBeDefined()
    expect(actualListItemText.prop('primary')).toBe(EXPECTED_PRIMARY_PROP)
    expect(actualListItemText.prop('secondary')).toBe(EXPECTED_SECONDARY_PROP)
  })
})
