import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Movie from './Movie';
import { isTerminating } from 'apollo-link/lib/linkUtils';

describe("Movie", () => {
    it("Check if props passed correctly", () => {
        const movieObject = {
            "poster":"www.google.com",
            "title":"La pelicula test",
            "id":"AHAHAHHAHA"
        }

        const component = shallow(<Movie title={movieObject.title} poster={movieObject.poster} id={movieObject.poster} />)

        expect(component.find(".card-title").text()).toBe(movieObject.title)
    }
    )

    it("Check movie renders fine", () => {
        expect(component).toMatchSnapshot()
    })
})