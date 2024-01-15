import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    depto: [],
    deptos: [],
    deptosFiltered: [],
    min: false,
    max: false,
  },
  reducers: {
    postDepto: (state, action) => {
      state.depto = action.payload;
    },
    getDepto: (state, action) => {
      state.deptos = action.payload;
    },
    getDeptoFiltered: ( state, action ) => {
      let array = action.payload[0]
      if(action.payload[1][0] == "no"){
        state.deptos = array.filter((casa)=> !casa.cochera)
      }
      if(action.payload[1][0] == "yes"){
        state.deptos = array.filter((casa)=> casa.cochera)
      }
      if(action.payload[1][1] == "min"){
        state.deptos = array.filter((casa)=> casa.precio >action.payload[1])
      }
      if(action.payload[1][1] == "max"){
        state.deptos = array.filter((casa)=> casa.precio < action.payload[1])
      }
    }
  },
});

export const { postDepto, getDepto, getDeptoFiltered } = counterSlice.actions;
export default counterSlice.reducer;