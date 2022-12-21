import React from 'react';
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import { setupStore } from './redux/store';
import { initialState } from './redux/reducers/dogSlice';
import { renderWithProviders } from './redux/test-utils';
import App from './App';

describe(App, () => {

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
            ctx.delay(100)
        )
    }),
    rest.get('https://dog.ceo/api/breed/bulldog/images', (req, res, ctx) => {
        return res(
            ctx.json(
              {
                "message":[
                  "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg",
                  "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Akita_inu.jpg"
                ],
                "status":"success"
              }
            ),
            ctx.delay(100)
        )
    }),
    rest.get('https://dog.ceo/api/breed/bulldog/english/images', (req, res, ctx) => {
        return res(
            ctx.json(
              {
                "message":[
                  "https:\/\/images.dog.ceo\/breeds\/akita\/512px-Ainu-Dog.jpg"
                ],
                "status":"success"
              }
            ),
            ctx.delay(100)
        )
    }),
  ]

  const server = setupServer(...handlers)
    
  // Enable API mocking before tests.
  beforeAll(() => server.listen())
  
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
      server.resetHandlers()
      cleanup()
  })
  
  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

  it('renders the application title!', () => {
    const {getByText} = renderWithProviders(<App />, {
      preloadedState: {
          dog: initialState
      }
    })
    expect(getByText("Dog Poster Generator")).toBeInTheDocument();
  })

  it('renders the breed dropdown label', () => {
    const {getByText} = renderWithProviders(<App />, {
      preloadedState: {
          dog: initialState
      }
    })
    expect(getByText('Breed Dropdown')).toBeInTheDocument()
  })

  it('should display breeds upon breed dropdown click', async () => {
    const user = userEvent.setup()

    const { getByTestId, getByText } = renderWithProviders(<App />, {
        preloadedState: {
            dog: initialState
        }
    })

    await user.click(screen.getAllByLabelText(/^Breed Dropdown/i)[0]);
    await waitFor(() => expect(getByText('bulldog')).toBeInTheDocument())
  })

  it('should request images & populate image count after breed selection', async () => {
    const user = userEvent.setup()

    const { getByTestId, getByText } = renderWithProviders(<App />, {
        preloadedState: {
            dog: initialState
        }
    })

    await user.click(screen.getAllByLabelText(/^Breed Dropdown/i)[0]);
    await waitFor(() => expect(getByText('bulldog')).toBeInTheDocument())
    await user.click(screen.getByText('bulldog'))
    await waitFor(() => expect(getByTestId('image-count')).toHaveTextContent('2'))
  })

  // it('should update image count after a breed selection and a subsequent sub-breed selection are made', async () => {
  //   const user = userEvent.setup()

  //   const { getByTestId, getByText } = renderWithProviders(<App />, {
  //       preloadedState: {
  //           dog: initialState
  //       }
  //   })

  //   await user.click(screen.getAllByLabelText(/^Breed Dropdown/i)[0]);
  //   await waitFor(() => expect(getByText('bulldog')).toBeInTheDocument())
  //   await user.click(screen.getByText('bulldog'))
  //   await user.click(screen.getAllByLabelText(/^Breed Dropdown/i)[1]);
  //   await waitFor(() => expect(getByText('english')).toBeInTheDocument())
  //   await user.click(screen.getByText('english'))
  //   await waitFor(() => expect(getByTestId('image-count')).toHaveTextContent('1'))
  // })

  it('should allow creation of additional rows', async () => {
    const user = userEvent.setup()

    const { getByTestId, getByText } = renderWithProviders(<App />, {
        preloadedState: {
            dog: initialState
        }
    })

    await user.click(screen.getByText('+'))
    await waitFor(() => expect(screen.getAllByText('Image count:')[1]).toBeInTheDocument())
  })
})
