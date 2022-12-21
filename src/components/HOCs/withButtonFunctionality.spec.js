import React from 'react'
import withButtonFunctionality from './withButtonFunctionality'
import { render } from '@testing-library/react';

describe(withButtonFunctionality, () => {

    it('passes props to the wrapped component', () => {
        const OriginalComponent = (props) => {
            return(
                <div>{props.exampleValue}</div>
            )
        }
        const WrappedComponent = withButtonFunctionality(OriginalComponent)
        const {getByText} = render(
            <WrappedComponent exampleValue="Test value" />
        )
        expect(getByText('Test value')).toBeInTheDocument()
    })
})