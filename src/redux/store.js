import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';


const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: reducer,
  })

export default store;