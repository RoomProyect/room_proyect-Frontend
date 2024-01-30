import { createSlice } from "@reduxjs/toolkit";


export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        reviews: [],
        review: {},
        paginado: {},
    },
    reducers: {
        getComments: ( state,action ) => {
            state.reviews = action.payload;
        },
        postComments: ( state,action ) => {
            state.review = action.payload;
        },
        paginateComments: ( state,action ) => {
            state.paginado = {
                totalPages: action.payload.totalPages,
                pageActual: action.payload.page,
                prevPage: action.payload.prevPage,
                nextPage: action.payload.nextPage
            };
        },
        nextPageComment: (state) => {
            state.paginado.pageActual += 1;
        },
        prevPageComment: (state) => {
            state.paginado.pageActual -= 1;
        },
    },
});
      
export const {
getComments,
postComments,
paginateComments,
nextPageComment,
prevPageComment
} = commentSlice.actions;

export default commentSlice.reducer;