import { setupServer } from 'msw/node'
import { rest } from 'msw';
import { setupStore } from '../store';
import { cleanup,} from '@testing-library/react';
import dogReducer, {
    setBreedsList,
    setImagesList,
    addRow,
    setSelectedBreed,
    setSelectedSubBreed,
    setImageUrls,
    initialState,
    fetchBreedsAndSubBreedsAsync,
    fetchRowImageUrls
} from './dogSlice'

let store = setupStore()

describe('dog reducer', () => {

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
    beforeAll(() => {
        server.listen()
    })
    afterEach(() => {
        server.resetHandlers()
        cleanup()
    })
    afterAll(() => server.close())

    it('should handle an initial state', () => {
      const data = dogReducer(initialState, () => {})
      expect(data.breedsAndSubBreeds).toEqual({});
      expect(data.breedsList).toEqual([]);
      expect(data.imagesList).toEqual([]);
      expect(data.rowsData[0].selectedBreed).toEqual('');
      expect(data.rowsData[0].selectedSubBreed).toEqual('');
      expect(data.rowsData[0].imageUrls).toEqual([]);
    });
    it('should handle setting breeds', () => {
      const data = dogReducer(initialState, setBreedsList(['akita, pug']));
      expect(data.breedsList).toEqual(['akita, pug']);
    });
    it('should handle setting images', () => {
      const data = dogReducer(initialState, setImagesList([
        'https://images.dog.ceo/breeds/african/n02116738_6754.jpg',
        'https://images.dog.ceo/breeds/african/n02116738_7753.jpg',
        'https://images.dog.ceo/breeds/african/n02116738_8734.jpg'
      ]));
      expect(data.imagesList).toEqual([
        'https://images.dog.ceo/breeds/african/n02116738_6754.jpg',
        'https://images.dog.ceo/breeds/african/n02116738_7753.jpg',
        'https://images.dog.ceo/breeds/african/n02116738_8734.jpg'
      ]);
    });
    it('should handle adding a row ', () => {
      const data = dogReducer(initialState, addRow());
      expect(data.rowsData.length).toEqual(2);
    });
    it('should handle setting a selected breed in a specific row ', () => {
      const data = dogReducer(initialState, setSelectedBreed({
        index: 0,
        data: 'puggle'
      }));
      expect(data.rowsData[0].selectedBreed).toEqual('puggle');
    });
    it('should handle setting a selected sub-breed in a specific row ', () => {
      const data = dogReducer(initialState, setSelectedSubBreed({
        index: 0,
        data: 'english'
      }));
      expect(data.rowsData[0].selectedSubBreed).toEqual('english');
    });
    it('should handle setting imageUrls in a specific row ', () => {
        const data = dogReducer(initialState, setImageUrls({
            index: 0,
            data: [
                'https://images.dog.ceo/breeds/african/n02116738_6754.jpg',
                'https://images.dog.ceo/breeds/african/n02116738_7753.jpg',
                'https://images.dog.ceo/breeds/african/n02116738_8734.jpg'
            ]
        }));
        expect(data.rowsData[0].imageUrls).toEqual(
            [
                'https://images.dog.ceo/breeds/african/n02116738_6754.jpg',
                'https://images.dog.ceo/breeds/african/n02116738_7753.jpg',
                'https://images.dog.ceo/breeds/african/n02116738_8734.jpg'
            ]
            );
    });
    it('fetches breeds & sub-breeds in async fashion and dispatches the data', async () => {
        const data = await store.dispatch(fetchBreedsAndSubBreedsAsync())
        expect(data.payload.african).toBeDefined()
        expect(data.payload.affenpinscher).toBeDefined()
        expect(data.payload.bulldog.includes('french')).toEqual(true)
    });
    it('fetches breed images in async fashion and dispatches the data', async () => {
        const result = await store.dispatch(fetchRowImageUrls({index: 0, breed: 'bulldog'}))
        expect(result.payload.index).toEqual(0)
        expect(result.payload.data.length).toEqual(2)
    });
    it('fetches breed images in async fashion and dispatches the data', async () => {
        const result = await store.dispatch(fetchRowImageUrls({index: 0, breed: 'bulldog', subBreed: 'english'}))
        expect(result.payload.index).toEqual(0)
        expect(result.payload.data.length).toEqual(1)
    });

});