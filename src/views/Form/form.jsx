import { useForm } from "react-hook-form";

const form = () => {

    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        // a donde vamos a enviar la data
        console.log(data)
    }

    return <div>
        <h2>Formulario</h2>
        <form onSubmit = {handleSubmit(onSubmit)}>
            <label htmlFor="">Precio</label>
            <input type="text" name="precio" id="precio" {...register("precio")} />

            <label htmlFor="">Descripcion</label>
            <input type="text" name="descripcion" id="descripcion" {...register("descripcion")}/>

            <label htmlFor="">Metros cuadrados de la Vivienda</label>
            <input type="text" name="mcCasa" id="mcCasa" />
            
            <label htmlFor="">Metros cuadrados del terreno</label>
            <input type="text" name="mcTerreno" id="mcTerreno" {...register("mcTerreno")}/>
            
            <label htmlFor="">Ambientes</label>
            <input type="text" name="ambientes" id="ambientes" {...register("ambientes")}/>

            <label htmlFor="">Baños</label>
            <input type="text" name="baños" id="baños" {...register("baños")}/>

            <label htmlFor="">Cocheras</label>
            <input type="text" name="cocheras" id="cocheras" {...register("cochera")}/>

            <label htmlFor=""></label>
            <input type="text" name="" id="" />
        </form>
    </div>
}

export default form;
