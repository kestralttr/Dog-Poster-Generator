import React, {useState} from 'react'
import GenerateAllButton from './GenerateAllButton'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe(GenerateAllButton, () => {
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
                    <GenerateAllButton clickFunction={handleClick}/>
                </div>
            )
        }
        const { getByText } = render(
            <TestComponent />
        )
        await user.click(getByText('Generate All'));
        await waitFor(() => expect(getByText('11')).toBeInTheDocument())
    })
})