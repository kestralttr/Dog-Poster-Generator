import React from 'react';
import { cleanup } from '@testing-library/react'
import { initialState } from '../redux/reducers/dogSlice'
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import Row from './row'
import { renderWithProviders } from '../redux/test-utils';

const fakeRowProps = {
    selectedBreed: '',
    setSelectedBreed: () => {},
    selectedSubBreed: '',
    setSelectedSubBreed: () => {},
    imageUrls: [],
    isLast: true,
    index: 0
}

describe(Row, () => {

    const handlers = [
        rest.get('https://dog.ceo/api/breeds/list/all', (req, res, ctx) => {
            return res(
                ctx.json(
                    {
                        "message":
                            {
                                "affenpinscher":[],
                                "african":[],
                                "australian":["shepherd"],
                                "bulldog":["boston","english","french"]
                            },
                    "status":"success"
                }),
                ctx.delay(150)
            )
        }),
        rest.get('https://dog.ceo/api/breed/african/images', (req, res, ctx) => {
            return res(
                ctx.json(
                    {
                        "message":
                            {
                                "affenpinscher":[],
                                "african":[],
                                "australian":["shepherd"],
                                "bulldog":["boston","english","french"]
                            },
                    "status":"success"
                }),
                ctx.delay(150)
            )
        })
    ]
    
    const server = setupServer(...handlers)
    
    beforeAll(() => server.listen())
    
    afterEach(() => {
        server.resetHandlers()
        cleanup()
    })
    
    afterAll(() => server.close())


    it('renders a row', () => {
        const {getByTestId} = renderWithProviders(<Row {...fakeRowProps} />, {
            preloadedState: {
                dog: initialState
            }
        })
        expect(getByTestId('form')).toBeInTheDocument()
    })

    it('renders the breed dropdown label', () => {
        const {getByText} = renderWithProviders(<Row {...fakeRowProps} />, {
            preloadedState: {
                dog: initialState
            }
        })
        expect(getByText('Breed Dropdown')).toBeInTheDocument()
    })

    it('renders the sub-breed dropdown label', () => {
        const {getByText} = renderWithProviders(<Row {...fakeRowProps} />, {
            preloadedState: {
                dog: initialState
            }
        })
        expect(getByText('Sub-breed Dropdown')).toBeInTheDocument()
    })

    it('renders image text with initial redux state', () => {
        const { getByText } = renderWithProviders(<Row {...fakeRowProps} />, {
            preloadedState: {
                dog: initialState
            }
        })
        const imageCountElement = getByText(/Image/i)
        expect(imageCountElement).toBeInTheDocument()
    })

})