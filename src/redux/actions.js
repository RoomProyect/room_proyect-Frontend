import axios from 'axios'

const extraer_ciudades = (array) =>{
  return array.map((el)=>{return el.nombre})
}

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

export const  getProvincias = () => {
  return async (dispatch) => {
      try{
          const { data } = await axios('https://apis.datos.gob.ar/georef/api/provincias')

          dispatch({
              type: 'get_provincias',
              payload: extraer_ciudades(data.provincias),
          });

      }catch(error){
          throw Error(error.message) 
      }
  }
};
