import React from 'react';
import { initialState } from '../redux/reducers/dogSlice'
import Rows from './rows'
import { renderWithProviders } from '../redux/test-utils';

describe(Rows, () => {
    it('does not show the modal visual elements upon initial render', () => {
        const {queryByText} = renderWithProviders(<Rows />, {
            preloadedState: {
                dog: initialState
            }
        })
        
        expect(queryByText('Enjoy your dog posters!')).toBeNull()
    })

    it('shows the row visual elements upon initial render', () => {
        const {getByText} = renderWithProviders(<Rows />, {
            preloadedState: {
                dog: initialState
            }
        })
        
        expect(getByText('Breed Dropdown')).toBeInTheDocument()
        expect(getByText('Sub-breed Dropdown')).toBeInTheDocument()
        expect(getByText('Image count:')).toBeInTheDocument()
        expect(getByText('Generate')).toBeInTheDocument()
        expect(getByText('+')).toBeInTheDocument()
    })
})