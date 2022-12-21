import { fetchFromDogApi } from './dogApi'
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

describe('dog api request', () => {

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
        })
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

    it('should fetch a master breed list', async () => {
        const data = await fetchFromDogApi('breeds/list/all')
        expect(data).toBeDefined()
        expect(Object.keys(data)).toContain('affenpinscher')
        expect(Object.keys(data)).toContain('african')
        expect(Object.keys(data)).toContain('australian')
        expect(Object.keys(data)).toContain('bulldog')
    });
    it('should fetch a master breed list that includes applicable sub-breeds', async () => {
        const data = await fetchFromDogApi('breeds/list/all')
        expect(data).toBeDefined()
        expect(data.bulldog).toContain('boston')
        expect(data.bulldog).toContain('english')
        expect(data.australian).toContain('shepherd')
        expect(data.african.length).toEqual(0)
    })
})