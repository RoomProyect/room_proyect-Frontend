import axios from 'axios';
import { postDepto, getDepto, getDeptoFiltered, paginate, postLogin, postRegister } from './slice/counterSlice';

const endpoint = '/apartment';

export const postDeptoAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post(endpoint, data);
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

export const getDeptoAsync = (page = 1) => async (dispatch) => {
  try {
    const response = await axios(`${endpoint}?page=${page}`);
    dispatch(getDepto(response.data.docs));
    dispatch(paginate(response.data));
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
});

export const prevPage = () => ({
  type: 'counter/prevPage',
});

export const postActionLogin = (dataUser) => async (dispatch) => {
  try {
    const { data } = await axios.post('/users', dataUser);
    dispatch(postLogin(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};

export const postActionRegister = (dataUser) => async (dispatch) => {
  console.log(dataUser);
  try {
    const { data } = await axios.post('http://localhost:3001/users', dataUser);
    dispatch(postRegister(data));
    console.log(data);
    alert('Usuario registrado');
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};

export const getActionFiltered = (filtro) => async (dispatch) => {
  try {
    const { data } = await axios(endpoint);
    dispatch(getDeptoFiltered([data, filtro]));
    console.log(data, filtro);
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};
