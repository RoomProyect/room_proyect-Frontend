import axios from 'axios';
import { postDepto, getDepto, getDeptoFiltered, paginate, getProv } from './slice/counterSlice';
import {getUsers_, setUser_} from './slice/userSlice'

const endpoint = '/apartment';

export const postDeptoAsync = (data) => async (dispatch) => {

  try {
    const response = await axios.post(endpoint, data);

    // Utiliza la acción directamente desde el slice
    dispatch(postDepto(response.data));
    alert('Agregado correctamente!');
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};

export const getDeptoAsync = ( page = 1 ) => async (dispatch) => {

  try {
    const response = await axios(`${ endpoint }?page=${ page }`);
    // console.log( response.data );

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

export const nextPage = () => ({
  type: 'counter/nextPage',
})

export const prevPage = () => ({
  type: 'counter/prevPage',
})

export const getActionFiltered = ( filtro ) => async ( dispatch ) => {
  try {
    const { data } = await axios( endpoint );
    dispatch(getDeptoFiltered([data.docs, filtro]))
    console.log(data, filtro)
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

export const getUsers = () => async(dispatch) => {
  try {
    const {data} = await axios('/users')
    console.log(data)
    dispatch(getUsers_(data))
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
  }
}

export const setUser = (data) => (dispatch) => {
  dispatch(setUser_(data))
};