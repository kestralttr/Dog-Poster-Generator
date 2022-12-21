import React, {useState} from 'react'
import GenerateButton from './GenerateButton'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe(GenerateButton, () => {
    it('can use a click function passed in via props', async () => {
        const user = userEvent.setup()
        const TestComponent = () => {
            const [value, setValue] = useState(10)
            const handleClick = () => {
                setValue(value+1)
            }
            return (
                <div>
                    <div>{value}</div>
                    <GenerateButton clickFunction={handleClick}/>
                </div>
            )
        }
        const { getByText } = render(
            <TestComponent />
        )
        await user.click(getByText('Generate'));
        await waitFor(() => expect(getByText('11')).toBeInTheDocument())
    })
})