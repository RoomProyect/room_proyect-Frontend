import axios from 'axios';
import { postDepto, getDepto } from './slice/counterSlice';

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

export const getDeptoAsync = () => async (dispatch) => {

  try {
    const response = await axios(endpoint);
    console.log(response.data);

    // Utiliza la acción directamente desde el slice
    dispatch(getDepto(response.data));
  } catch (error) {
    dispatch({
      type: 'error',
      payload: error.message,
    });
    console.log(error);
  }
};