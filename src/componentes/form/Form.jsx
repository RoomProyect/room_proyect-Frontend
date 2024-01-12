import {uploadFile} from '../../firebase/config'
import { useForm } from "react-hook-form";
import style from './style.module.css'
import { useDispatch } from 'react-redux';
import { postDepto } from '../../redux/actions';

const Form = ( ) =>{
    
        const dispatch = useDispatch()
        const { register, handleSubmit} = useForm();
    
        const onSubmit = (data) => {
            // a donde vamos a enviar la data
            dispatch(postDepto(data))
            console.log(data)
        }
return (



<div>
        <h2>Formulario</h2>
        <form onSubmit = {handleSubmit(onSubmit)} className={style.form}>
            <label htmlFor="">Precio</label>
            <input type="text" name="precio" id="precio" {...register("precio")} />

            <label htmlFor="">Descripcion</label>
            <input type="text" name="descripcion" id="descripcion" />

            <label htmlFor="">Metros cuadrados de la Vivienda</label>
            <input type="text" name="mcCasa" id="mcCasa" />
            
            <label htmlFor="">Metros cuadrados del terreno</label>
            <input type="text" name="mcTerreno" id="mcTerreno" />
            
            <label htmlFor="">Ambientes</label>
            <input type="text" name="ambientes" id="ambientes" />

            <label htmlFor="">Baños</label>
            <input type="text" name="baños" id="baños" />

            <label htmlFor="">Cocheras</label>
            <input type="text" name="cocheras" id="cocheras" />

            <label htmlFor=""></label>


    <div>
    <input type="file" onChange={e => uploadFile(e.target.files[0])} />

    </div>
            <input type="submit" value="Enviar" />
        </form>
    </div>



)

}
export default Form