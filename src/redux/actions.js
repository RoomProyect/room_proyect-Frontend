import axios from 'axios';
import { putDepto, postDepto, getDepto, getDeptoFiltered, paginate, getProv, getDeptoById } from './slice/counterSlice';
import {getUsers_, setUser_, paginateUsers, prevPageUsers, nextPageUsers, getAllUsers_} from './slice/userSlice'
import { getComments, nextPageComment, paginateComments, postComments, prevPageComment } from './slice/commentSlice';

import Swal from 'sweetalert2'
const endpoint = '/apartment';

export const postDeptoAsync = (data) => async (dispatch) => {

  try {
    const response = await axios.post(endpoint, data);

    // Utiliza la acción directamente desde el slice
    dispatch(postDepto(response.data));
    Swal.fire({
      icon: 'success',
      title: `Agregado`,
      text: 'El departamento se publico correctamente',
    });
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
  }
};

export const getDeptoAsync = ( page = 1 ) => async (dispatch) => {
  try {
    const response = await axios(`${ endpoint }?page=${ page }`);

    // Utiliza la acción directamente desde el slice
    dispatch( getDepto( response.data.docs ) );
    dispatch( paginate( response.data ) );
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios(`/users?allUsers=${"true"}`)
    dispatch(getAllUsers_(data.docs))
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    })
  }
}

export const getUsers = (page, allUsers) => async(dispatch) => {
  try {
    if(allUsers){
      const {data} = await axios(`/users?allUsers=${allUsers}`)
      dispatch(getUsers_(data.docs))
    }
    if(page){
      const {data} = await axios(`/users?page=${page}&limit=8`)
      dispatch(getUsers_(data.docs))
      dispatch(paginateUsers(data))
    }
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
  }
}

export const nextPage = () => ({
  type: 'counter/nextPage',
})

export const prevPage = () => ({
  type: 'counter/prevPage',
})

export const nextPageCommentAction = ( dispatch ) => {
  dispatch( nextPageComment() );
}

export const prevPageCommentaction = ( dispatch ) => {
  dispatch( prevPageComment() );
}

export const getActionFiltered = ( filtro ) => async ( dispatch ) => {
  try {
    console.log(filtro, "soy el pepe")
    if(filtro[2]){
      console.log(filtro,"entre al combi");
      const { data } = await axios( `/apartment?precio[${filtro[1]}]=${filtro[0]}&precio[${filtro[3]}]=${filtro[2]}` )
      dispatch(getDeptoFiltered(data.docs))
    }else{
      console.log(filtro,"entre al solo");
      const { data } = await axios( `/apartment?precio[${filtro[1]}]=${filtro[0]}` );
      dispatch(getDeptoFiltered(data.docs))
    }
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};

export const getProvincias = ()=> async(dispatch) => {
  try {
    const {data} = await axios('https://apis.datos.gob.ar/georef/api/provincias')
    dispatch(getProv(data))
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
  }
}



export const putDeptoActions = (data)=> async (dispatch) =>{
  try {
    const response = await axios.put('https://room-project-backend.onrender.com/apartment', data);
    dispatch( putDepto( response.data ) );
  } catch (error) {
    dispatch({
      type: "error",
      payload: error.message
    })
  }
}

export const getDeptoByIdAsync = (idDepto)=> async (dispatch) =>{
  try {
    const response = await axios(`${ endpoint }/${ idDepto }`);
    // Utiliza la acción directamente desde el slice
    dispatch( getDeptoById( response.data ) );
  } catch (error) {
    dispatch({
      type: "error",
      payload: error.message
    })
  }
}

export const nextPageUsersAction = (dispatch) => {
  dispatch(nextPageUsers())
}

export const prevPageUsersAction = (dispatch) => {
  dispatch(prevPageUsers())
}


export const updateUser = (data) => async (dispatch) =>{
  try {
    const response = await axios.put('/users', data);
    // Utiliza la acción directamente desde el slice
    
  } catch (error) {
    dispatch({
      type: "error",
      payload: error.message
    })
  }
}

export const setUser = (data) => (dispatch) => {
  dispatch(setUser_(data))
};

//Actions for reviews

export const getReviews = ( page = 1 ) => async ( dispatch ) => {
  try {
    // const { data } = await axios( '/coment' );
    const { data } = await axios( `/coment?page=${ page }` );

    dispatch( getComments( data.docs ) );
    dispatch( paginateComments( data ) );
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message
    })
  }
}

export const postReviews = ( dataReview ) => async( dispatch ) => {
  try {
    const { data } = await axios.post( '/coment',dataReview );
    dispatch( postComments( data ) );
    Swal.fire({
      icon: 'success',
      title: `Agregado`,
      text: 'El departamento comentario se publico correctamente',
    });
    window.location.reload();
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message
    })
  }
}