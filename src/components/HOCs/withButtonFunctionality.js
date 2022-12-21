import React from 'react'

const withButtonFunctionality = (OriginalComponent) => {
    return function NewComponent(props) {

        const variantValue = 'contained'
        const sxValues = {
            margin: '0 5px'
        }

        return (
            <OriginalComponent
                {...props}
                classNameString="reusable-button"
                variantValue={variantValue}
                initialSxValues={sxValues}
            />
        )
    }
}

export default withButtonFunctionality
