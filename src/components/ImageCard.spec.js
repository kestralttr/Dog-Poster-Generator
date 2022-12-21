import React from 'react'
import { render } from '@testing-library/react';
import ImageCard from './ImageCard';

describe(ImageCard, () => {
    it('given an imageUrl, displays one image card with a role of img', () => {
        const {getByRole} = render(
            <ImageCard imageUrl={"https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg"} />
        )
        const imgElement = getByRole('img')
        expect(imgElement).toBeInTheDocument()
    })
})