import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dogReducer from './reducers/dogSlice'

const rootReducer = combineReducers({
  dog: dogReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}