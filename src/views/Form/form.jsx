import { uploadFile } from '../../firebase/config';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postDeptoAsync, getDeptoAsync } from '../../redux/actions';
import styles from './form.module.css';
import NavBar from '../../componentes/navBar/NavBar'
import { useState } from 'react';


const Form = () => {

    const [img, setImg] = useState()
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const result = await uploadFile(img)
         data.img = result
   console.log(result);
         dispatch(postDeptoAsync(data));
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.navBar}><NavBar /></div>
            <h2 className={styles.formTitle}>Formulario</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label htmlFor="precio" className={styles.formLabel}>Precio</label>
                    <input type="text" name="precio" id="precio" {...register('precio')} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="descripcion" className={styles.formLabel}>Descripcion</label>
                    <input type="text" name="descripcion" id="descripcion" {...register('descripcion')} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="">Metros cuadrados del terreno</label>
                    <input type="text" name="mcTerreno" id="mcTerreno" {...register("mcTerreno")} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="">Ambientes</label>
                    <input type="text" name="ambientes" id="ambientes" {...register("ambientes")} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="">Baños</label>
                    <input type="text" name="baños" id="baños" {...register("baños")} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="cocheras" className={styles.formLabel}>Cocheras</label>
                    <input type="text" name="cocheras" id="cocheras" {...register('cochera')} className={styles.formInput} />
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

export default Form;
