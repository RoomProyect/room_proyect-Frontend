import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice';
import userSlice  from './slice/userSlice';
import commentSlice from './slice/commentSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    // Puedes agregar otros reducers aquí si los tienes
    user: userSlice,
    comment: commentSlice,
  },
});

export default store;