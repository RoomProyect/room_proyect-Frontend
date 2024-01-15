import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    // Puedes agregar otros reducers aquí si los tienes
  },
});

export default store;