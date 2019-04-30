import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitToppings={() => {}} />);
    });

    it('should render <BuildControls /> when receiving toppings', () => {
        wrapper.setProps({topps: {meat: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});