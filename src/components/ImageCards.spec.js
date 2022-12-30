import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import ImageCards from './ImageCards';

describe(ImageCards, () => {
    it('shows exactly 1 imageCard if the imagesList prop contains only one url', async () => {
        render(
            <ImageCards imagesList={[
                "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg"
            ]} />
        )
        await waitFor(() => expect(document.querySelectorAll('[alt="A picture of a dog"]')[0]).toBeInTheDocument())
        await waitFor(() => expect(document.querySelectorAll('[alt="A picture of a dog"]')[1]).toBeUndefined())
    })
    it('shows exactly 2 imageCards if the imagesList prop contains two urls', async () => {
        render(
            <ImageCards imagesList={[
                "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg",
                "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Akita_inu.jpg"
            ]} />
        )
        await waitFor(() => expect(document.querySelectorAll('[alt="A picture of a dog"]')[0]).toBeInTheDocument())
        await waitFor(() => expect(document.querySelectorAll('[alt="A picture of a dog"]')[1]).toBeInTheDocument())
        await waitFor(() => expect(document.querySelectorAll('[alt="A picture of a dog"]')[2]).toBeUndefined())
    })
})