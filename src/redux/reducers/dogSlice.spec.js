import dogReducer, {
    setBreedsList,
    setImagesList,
    addRow,
    setSelectedBreed,
    setSelectedSubBreed,
    setImageUrls,
    initialState,
} from './dogSlice'

describe('dog reducer', () => {
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

});