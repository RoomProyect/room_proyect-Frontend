import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const postUserData = createAsyncThunk('user/postUserData', async (userData, thunkAPI) => {
    console.log(userData)
    try {
        const response = await axios.post('https://room-project-backend.onrender.com/users', {...userData, rol: "user"})
        console.log(response.data)
        return [response.data]

    } catch (error) {
        console.log(error.message)
        return thunkAPI.rejectWithValue({ error: 'Hubo un error al realizar la solicitud' });
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        data: null,
        status: 'idle',
        users:[],
    },
    reducers: {
      getUsers_: (state, action)=>{
        state.users = action.payload
      },
      setUser_: (state, action)=>{
        state.data = action.payload
      },
    },
    extraReducers: (builder) => {
        builder.addCase(postUserData.pending, (state) => {
          state.status = 'loading';
        });
        builder.addCase(postUserData.fulfilled, (state, action) => {
          state.data = action.payload
          console.log(action.payload)
          state.status = 'succeeded';
        });
        builder.addCase(postUserData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload.error;
        });
    },

})
export const {getUsers_, setUser_} = userSlice.actions
export default userSlice.reducer;

//   export default userSlice.reducer;