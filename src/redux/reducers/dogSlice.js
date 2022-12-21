import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFromDogApi } from '../request-handlers/dogApi';

export const initialRowData = {
  selectedBreed: '',
  selectedSubBreed: '',
  imageUrls: []
}

export const initialState = {
  breedsAndSubBreeds: {},
  breedsList: [],
  imagesList: [],
  rowsData: [initialRowData]
};

export const fetchBreedsAndSubBreedsAsync = createAsyncThunk(
  'FETCH_BREED_LIST',
  async () => {
    const response = await fetchFromDogApi('breeds/list/all');
    
    return response;
  }
);

export const fetchRowImageUrls = createAsyncThunk(
  'FETCH_ROW_IMAGE_URLS',
  async (data) => {
    const path = data.subBreed ? 'breed/' + data.breed +'/' + data.subBreed + '/images' : 'breed/' + data.breed + '/images'
    const response = await fetchFromDogApi(path);
    
    return {
      index: data.index,
      data: response
    };
  }
);

export const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {
    setBreedsList: (state, action) => {
      state.breedsList = action.payload
    },
    setImagesList: (state, action) => {
      state.imagesList = action.payload
    },
    addRow: (state) => {
      state.rowsData.push(initialRowData)
    },
    setSelectedBreed: (state, action) => {
      state.rowsData[action.payload.index].selectedBreed = action.payload.data
    },
    setSelectedSubBreed: (state, action) => {
      state.rowsData[action.payload.index].selectedSubBreed = action.payload.data
    },
    setImageUrls: (state, action) => {
      state.rowsData[action.payload.index].imageUrls = action.payload.data
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreedsAndSubBreedsAsync.fulfilled, (state, action) => {
        state.breedsAndSubBreeds = action.payload;
        state.breedsList = Object.keys(state.breedsAndSubBreeds)
      })
    builder
      .addCase(fetchRowImageUrls.fulfilled, (state, action) => {
        state.rowsData[action.payload.index].imageUrls = action.payload.data
      });
  },
});

export const {
  setBreedsList,
  setImagesList,
  setSelectedBreed,
  setSelectedSubBreed,
  setImageUrls,
  addRow
} = dogSlice.actions;

export const selectBreedsAndSubBreeds = (state) => state.dog.breedsAndSubBreeds;
export const selectBreedsList = (state) => state.dog.breedsList
export const selectImagesList = (state) => state.dog.imagesList
export const selectRowsData = (state) => state.dog.rowsData

export default dogSlice.reducer;
