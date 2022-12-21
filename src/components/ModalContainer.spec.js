import React from 'react'
import { renderWithProviders } from '../redux/test-utils';
import { initialState } from '../redux/reducers/dogSlice';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import { render, screen, cleanup, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import ModalContainer from './ModalContainer';

const fakeInitialStateWithImages = {
    breedsAndSubBreeds: {bulldog: ['french', 'english']},
    breedsList: ['bulldog'],
    imagesList: [
        "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg",
        "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Akita_inu.jpg"
    ],
    loading: false,
  }

describe(ModalContainer, () => {
    it('shows a modal that displays images if imagesList in Redux state is populated', () => {
            renderWithProviders(<ModalContainer />, {
                preloadedState: {
                    dog: fakeInitialStateWithImages
                }
            })
        expect(screen.getByText('Enjoy your dog posters!')).toBeInTheDocument()
        expect(screen.findByRole('img').length === 2)
    })

    it('should not show a modal if the imagesList in Redux is empty', () => {
            renderWithProviders(<ModalContainer setModalActive={() => {return null}} />, {
                preloadedState: {
                    dog: initialState
                }
            })
        const dogPicturesHeadline = screen.queryByText('Enjoy your dog posters!')
        expect(dogPicturesHeadline).toBeNull()
        expect(screen.findByRole('img').length === 0)
    })

    it('should fire setModalActive with an argument of false if background is clicked', async () => {
        const user = userEvent.setup()
        let modalActive = true
            renderWithProviders(<ModalContainer setModalActive={(value) => modalActive = value}/>, {
                preloadedState: {
                    dog: fakeInitialStateWithImages
                }
            })
        expect(screen.getByText('Enjoy your dog posters!')).toBeInTheDocument()
        expect(screen.findByRole('img').length === 2)
        const modalBackground = document.querySelector('.modal__background')
        await user.click(modalBackground)
        expect(modalActive === false)
    })
})