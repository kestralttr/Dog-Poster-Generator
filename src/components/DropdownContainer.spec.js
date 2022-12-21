import React from 'react'
import DropdownContainer from './DropdownContainer'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe(DropdownContainer, () => {

    it('renders a dropdown', () => {
        const {getByText} = render(
            <DropdownContainer options={[
                    'bulldog',
                    'african'
                ]}
                updateValue={(val) => {return val}}
                value=''
                className=''
                name='Breed Dropdown'
            />
        )
        expect(getByText('Breed Dropdown')).toBeInTheDocument()
    })

    it('shows options when clicked', async () => {
        const user = userEvent.setup()

        const {getByText, getByLabelText} = render(
            <DropdownContainer options={[
                    'bulldog',
                    'african'
                ]}
                updateValue={(val) => {return val}}
                value=''
                className=''
                name='Breed Dropdown'
            />
        )
        expect(getByText('Breed Dropdown')).toBeInTheDocument()
        await user.click(getByLabelText(/Breed Dropdown/i))
        await waitFor(() => expect(getByText('bulldog')).toBeInTheDocument())
    })

    it('shows selected option after clicking', async () => {
        const user = userEvent.setup()

        const {getByText, getByLabelText} = render(
            <DropdownContainer options={[
                    'bulldog',
                    'african'
                ]}
                updateValue={(val) => {return val}}
                value=''
                className=''
                name='Breed Dropdown'
            />
        )
        expect(getByText('Breed Dropdown')).toBeInTheDocument()
        await user.click(getByLabelText(/Breed Dropdown/i))
        await user.click(getByText('bulldog'))
        await waitFor(() => expect(getByText('bulldog')).toBeInTheDocument())
    })
})