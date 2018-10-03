import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Home from './Home';
import { isTerminating } from 'apollo-link/lib/linkUtils';

describe( "Home", () => {

    it("Home must be render correctly", () => {
        const component = shallow(<Home/>)
        expect(component).toMatchSanpshot();
    })
})