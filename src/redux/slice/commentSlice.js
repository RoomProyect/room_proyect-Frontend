import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        reviews: [],
        review: {},
    },
    reducers: {
        getComments: ( state,action ) => {
            state.reviews = action.payload;
        },
        postComments: ( state,action ) => {
            state.review = action.payload;
        }
    }
})

export const {
    getComments,
    postComments,
} = commentSlice.actions;

export default commentSlice.reducer;