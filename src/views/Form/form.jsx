import { uploadFile } from '../../firebase/config';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postDeptoAsync } from '../../redux/actions';
import styles from './form.module.css';
import NavBar from '../../componentes/navBar/NavBar'
import { useState } from 'react';
import { may_cero } from './validate';
// import PropTypes from 'prop-types';


const Form = () => {

    const [img, setImg] = useState()
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
                <input 
                    type="text"
                    name="titulo"
                    id="titulo"
                    className={styles.formInput}
                    { ...register('titulo',{ required: true } ) }
                />
                {errors.titulo?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="ambientes">Ambientes</label>
                <input 
                    type="text"
                    name="ambientes"
                    id="ambientes"
                    className={styles.formInput}
                    {...register("ambientes",{ 
                        required: "El campo es requerido",
                        validate: may_cero,
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Solo se permiten numeros',
                        }
                    })}
                />
                {errors.ambientes && <p>{errors.ambientes.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="baños">Baños</label>
                <input 
                    type="text"
                    name="baños"
                    id="baños"
                    className={styles.formInput}
                    {...register("baños",{ required: true } ) }
                />
                {errors.baños?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="cocheras" className={styles.formLabel}>Cocheras</label>
                <input 
                    type="text"
                    name="cocheras"
                    id="cocheras"
                    className={styles.formInput}
                    {...register('cochera',{ required: true } ) }
                />
                {errors.cochera?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="ciudad" className={styles.formLabel}>Ciudad</label>
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    className={styles.formInput}
                    {...register('ciudad',{ required: true } ) }
                />
                {errors.ciudad?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="descripcion" className={styles.formLabel}>
                    Descripcion
                </label>
            <input
                type="text"
                name="descripcion"
                id="descripcion"
                className={styles.formInput}
                {...register('descripcion', {
                required: true,
                minLength: 100,
                maxLength: 350,
                })}
            />
            {errors.descripcion?.type === 'required' && (
                <p className={styles.error}>Este campo es requerido</p>
            )}
            {errors.descripcion?.type === 'minLength' && (
                <p className={styles.error}>La descripción debe tener al menos 30 caracteres</p>
            )}
            {errors.descripcion?.type === 'maxLength' && (
                <p className={styles.error}>La descripción no puede tener más de 80 caracteres</p>
            )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="habitaciones" className={styles.formLabel}>Habitaciones</label>
                <input 
                    type="text"
                    name="habitaciones"
                    id="habitaciones"
                    className={styles.formInput}
                    {...register('habitaciones',{ required: true } ) }
                />
                {errors.habitaciones?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="mcTerreno">Metros cuadrados</label>
                <input 
                    type="text"
                    name="mcTerreno"
                    id="mcTerreno"
                    className={styles.formInput}
                    {...register("mcTerreno",{ required: true } ) }
                />
                {errors.mcTerreno?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="precio" className={styles.formLabel}>Precio</label>
                <input 
                    type="text"
                    name="precio"
                    id="precio"
                    className={styles.formInput}
                    {...register('precio',{ required: true } ) }
                />
                {errors.precio?.type === "required" && <p className = { styles.error }>Este campo es requerido</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="fileInput" className={styles.formLabel}>Selecciona un archivo</label>
                <input 
                    type="file"
                    id="fileInput"
                    onChange={(e) => setImg(e.target.files[0])}
                    className={styles.fileInput}
                />
            </div>

            <input type="submit" value="Enviar" className={styles.submitButton} />
        </form>
    </div>
    );
};

// Form.propTypes = {
//     id: PropTypes.string.isRequired,
//     ambientes: PropTypes.string.isRequired,
//     baños: PropTypes.string.isRequired,
//     cochera: PropTypes.string.isRequired,
//     descripcion: PropTypes.string.isRequired,
//     img: PropTypes.string.isRequired,
//     mcTerreno: PropTypes.string.isRequired,
//     precio: PropTypes.string.isRequired,
//     titulo: PropTypes.string.isRequired,
//     ciudad: PropTypes.string.isRequired,
//     habitaciones: PropTypes.string.isRequired,
// };



export default Form