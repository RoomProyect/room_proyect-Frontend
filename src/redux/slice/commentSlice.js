import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        reviews: [],
    },
    reducers: {
        getComments: ( state,action ) => {
            state.reviews = action.payload;
        }
    }
})

export const {
    getComments,
} = commentSlice.actions;

export default commentSlice.reducer;