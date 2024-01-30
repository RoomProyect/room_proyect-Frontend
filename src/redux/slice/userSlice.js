import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const postUserData = createAsyncThunk('user/postUserData', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('https://room-project-backend.onrender.com/users', {...userData, rol: "user"})
        .catch((error)=>{
          return Promise.reject(error.response.data);
        })
        return [response.data]

    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
})


export const userSlice = createSlice({
    name: 'user',
    initialState:{
        data: null,
        status: 'idle',
        users:[],
        paginado: {},
    },
    reducers: {
      getUsers_: (state, action)=>{
        state.users = action.payload
      },
      setUser_: (state, action)=>{
        state.data = action.payload
      },
      paginateUsers: ( state,action ) => {
        //state.totalPages = action.payload.totalPages;
        state.paginado = {
          totalPages: action.payload.totalPages,
          pageActual: action.payload.page,
          prevPage: action.payload.prevPage,
          nextPage: action.payload.nextPage,
        };
      },
      setCardsPerPageUsers: (state,) => {
        state.paginado.cardsPerPage = 8;
      },
      nextPageUsers: ( state ) => {
        state.paginado.pageActual += 1;
      },
      prevPageUsers: ( state ) => {
        state.paginado.pageActual -= 1;
      },
    },
    extraReducers: (builder) => {
        builder.addCase(postUserData.pending, (state) => {
          state.status = 'loading';
        });
        builder.addCase(postUserData.fulfilled, (state, action) => {
          state.data = action.payload
          state.status = 'succeeded';
        });
        builder.addCase(postUserData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload.error;
        });
    },

})
export const {getUsers_, setUser_, paginateUsers, nextPageUsers, prevPageUsers} = userSlice.actions
export default userSlice.reducer;