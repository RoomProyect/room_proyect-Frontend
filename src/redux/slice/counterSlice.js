import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    depto: [],
    deptos: [],
    deptosFiltered: [],
  },
  reducers: {
    postDepto: (state, action) => {
      state.depto = action.payload;
    },
    getDepto: (state, action) => {
      state.deptos = action.payload;
    },
    getDeptoFiltered: ( state,action ) => {
      state.deptosFiltered = action.payload;
    }
  },
});

export const { postDepto, getDepto } = counterSlice.actions;
export default counterSlice.reducer;