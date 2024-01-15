import { uploadFile } from '../../firebase/config';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postDeptoAsync } from '../../redux/actions';
import styles from './form.module.css';
import NavBar from '../../componentes/navBar/NavBar'
import { useState } from 'react';
import PropTypes from 'prop-types';


const Form = () => {

    const [img, setImg] = useState()
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const result = await uploadFile(img)
        data.img = result
        dispatch(postDeptoAsync(data));
        reset();
    };

return (
    <div className={styles.formContainer}>
        <div className={styles.navBar}>< NavBar /></div>
        <h2 className={styles.formTitle}> Formulario </h2>
        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <div className={styles.formGroup}>
                <label htmlFor="titulo" className={styles.formLabel}>Titulo</label>
                <input type="text" name="titulo" id="titulo" {...register('titulo')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="ambientes">Ambientes</label>
                <input type="text" name="ambientes" id="ambientes" {...register("ambientes")} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="baños">Baños</label>
                <input type="text" name="baños" id="baños" {...register("baños")} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="cocheras" className={styles.formLabel}>Cocheras</label>
                <input type="text" name="cocheras" id="cocheras" {...register('cochera')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="ciudad" className={styles.formLabel}>Ciudad</label>
                <input type="text" name="ciudad" id="ciudad" {...register('ciudad')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="descripcion" className={styles.formLabel}>Descripcion</label>
                <input type="text" name="descripcion" id="descripcion" {...register('descripcion')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="habitaciones" className={styles.formLabel}>Habitaciones</label>
                <input type="text" name="habitaciones" id="habitaciones" {...register('habitaciones')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="mcTerreno">Metros cuadrados</label>
                <input type="text" name="mcTerreno" id="mcTerreno" {...register("mcTerreno")} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="precio" className={styles.formLabel}>Precio</label>
                <input type="text" name="precio" id="precio" {...register('precio')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="fileInput" className={styles.formLabel}>Selecciona un archivo</label>
                <input type="file" id="fileInput" onChange={(e) => setImg(e.target.files[0])} className={styles.fileInput} />
            </div>

            <input type="submit" value="Enviar" className={styles.submitButton} />
        </form>
    </div>
    );
};

Form.propTypes = {
    id: PropTypes.string.isRequired,
    ambientes: PropTypes.string.isRequired,
    baños: PropTypes.string.isRequired,
    cochera: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    mcTerreno: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    ciudad: PropTypes.string.isRequired,
    habitaciones: PropTypes.string.isRequired,
};



export default Form