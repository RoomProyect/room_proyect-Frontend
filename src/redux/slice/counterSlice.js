import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    depto: [],
    deptos: [],
    deptosFiltered: [],
    deptosBackup: [],
    provincias: [],
    min: false,
    max: false,
    minPrice: 0,  // Nuevo estado para almacenar el valor mínimo
    maxPrice: Infinity,  // Nuevo estado para almacenar el valor máximo
    paginado: {},
    
  },
  reducers: {
    getProv: (state, action) =>{
      let provin = [] 
      console.log(action.payload.provincias)
      action.payload.provincias.forEach(element => {
        provin.push(element.nombre)
      });
      state.provincias = provin
    },
    postDepto: (state, action) => {
      state.depto = action.payload;
    },
    getDepto: (state, action) => {
      state.deptos = action.payload;
      state.deptosBackup = action.payload;
    },
    paginate: ( state,action ) => {
      state.totalPages = action.payload.totalPages;
      state.paginado = {
        totalPages: action.payload.totalPages,
        pageActual: action.payload.page,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage
      };
    },
    nextPage: ( state ) => {
      state.paginado.pageActual += 1;
    },
    prevPage: ( state ) => {
      state.paginado.pageActual -= 1;
    },
    getDeptoFiltered: ( state, action ) => {
      let array = action.payload[0]
      console.log(action.payload)
      if(action.payload[1][0] == "reset"){
        state.deptos = state.deptosBackup
      }
      if(action.payload[1][0] == "may_min"){
        state.deptos = state.deptos.sort((a, b) =>  b.precio - a.precio)
      }
      if (action.payload[1][0] == "min_may") {
        state.deptos = state.deptos.sort((a, b) => a.precio - b.precio)
      }
      if(action.payload[1][0] == "default"){
        state.deptos = state.deptosBackup
      }
      if (action.payload[1][0] == "no") {
        state.deptos = array.filter((casa) => !casa.cochera)
      }
      if (action.payload[1][0] == "yes") {
        state.deptos = array.filter((casa) => casa.cochera)
      }
      if (action.payload[1][1] == "min") {
        state.minPrice = action.payload[1][0]
        if (state.maxPrice != Infinity) {
          state.deptos = state.deptosBackup.filter((casa) => casa.precio > parseInt(action.payload[1][0]) && casa.precio < parseInt(state.maxPrice))
        } else {
          state.deptos = state.deptosBackup.filter((casa) => casa.precio > parseInt(action.payload[1][0]))
        }
      }
      if (action.payload[1][1] == "max") {
        state.maxPrice = action.payload[1][0]
        if (state.minPrice > 0) {
          state.deptos = state.deptosBackup.filter((casa) => casa.precio < parseInt(action.payload[1][0]) && casa.precio > parseInt(state.minPrice))
        } else {
          state.deptos = state.deptosBackup.filter((casa) => casa.precio < parseInt(action.payload[1][0]))
        }
      }
    }
  },
});

export const { 
  postDepto, 
  getDepto, 
  getDeptoFiltered,
  paginate,
  nextPage,
  prevPage,
  getProv,
} = counterSlice.actions;
export default counterSlice.reducer;