import React, {useState} from 'react'
import { render, waitFor } from '@testing-library/react'
import AddButton from './AddButton'
import userEvent from '@testing-library/user-event'

describe(AddButton, () => {
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
                    <AddButton clickFunction={handleClick}/>
                </div>
            )
        }
        const { getByText } = render(
            <TestComponent />
        )
        await user.click(getByText('+'));
        await waitFor(() => expect(getByText('11')).toBeInTheDocument())
    })
})