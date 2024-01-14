import axios from 'axios';
import { postDepto, getDepto } from './slice/counterSlice';

export const postDeptoAsync = (data) => async (dispatch) => {
  const endpoint = 'http://localhost:3001/apartment';

  try {
    console.log(data);
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
  const endpoint = 'http://localhost:3001/apartment';

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