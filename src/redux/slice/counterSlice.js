import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    depto: [],
    deptos: [],
  },
  reducers: {
    postDepto: (state, action) => {
      state.depto = action.payload;
    },
    getDepto: (state, action) => {
      state.deptos = action.payload;
    },
    getDeptoById: (state, action) =>{
      state.deptoById = action.payload
    }
  },
});

export const { postDepto, getDepto, getDeptoById } = counterSlice.actions;
export default counterSlice.reducer;