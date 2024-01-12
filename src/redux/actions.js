import axios from 'axios'


export const postDepto = (data) =>{
const endpoint = '/'

return async (dispatch) => {

    try {
      console.log(data)
      const response = await axios.post(endpoint, data)
      dispatch({
        type: 'post',
        payload: response.data,
      })
      alert("agregado correctamente! ")
    } catch (error) {
      dispatch({
        type: 'error',
        payload: error.message,
      });
      console.log(error);
    }

  }
}