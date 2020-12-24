import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormWithShadow from './FormWithShadow';
import FormInput from "../FormInput/FormInput";

configure({adapter: new Adapter()});

describe('<FormWithShadow />', () => {
    it('should render form with shadow', () => {
        // given

        // when
        const wrapper = shallow(<FormWithShadow inputs={true}/>);

        // then
        const actualFormWithShadow = wrapper.find('div.Shadow');
        expect(actualFormWithShadow).toBeDefined();

        const actualForm = actualFormWithShadow.find('Form');
        expect(actualForm).toBeDefined();
        expect(actualForm.prop('inputs')).toBe(true);
    });
});