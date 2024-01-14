import { uploadFile } from '../../componentes/Firebase/config';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import NavBar from '../../componentes/navBar/NavBar'
import { may_cero } from './validator';

const Form = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

return (
        <div className={styles.formContainer}>
            <div className={styles.navBar}><NavBar/></div>
        <h2 className={styles.formTitle}>Formulario</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
            <label htmlFor="precio" className={styles.formLabel}>Precio</label>
            <input type="text" name="precio" id="precio" {...register('precio', {
                required:true,
                validate: may_cero
                })} className={styles.formInput} />
            {errors.precio?.type === "required" && <p>El campo es requerido</p>}
            {errors.precio?.type === "validate" && <p>El precio no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="">Ambientes</label>
            <input type="text" name="ambientes" id="ambientes" {...register("ambientes", {required:true, validate: may_cero})} className={styles.formInput}/>
            {errors.ambientes?.type === "required" && <p>El campo es requerido</p>}
            {errors.ambientes?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="descripcion" className={styles.formLabel}>Descripcion</label>
            <input type="text" name="descripcion" id="descripcion" {...register('descripcion')} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="">Metros cuadrados de la vivienda</label>
            <input type="text" name="mcVivienda" id="mcVivienda" {...register("mcVivienda", {required:true, validate: may_cero})} className={styles.formInput}/>
            {errors.mcVivienda?.type === "required" && <p>El campo es requerido</p>}
            {errors.mcVivienda?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="">Metros cuadrados del terreno</label>
            <input type="text" name="mcTerreno" id="mcTerreno" {...register("mcTerreno", {required:true, validate: may_cero})} className={styles.formInput}/>
            {errors.mcTerreno?.type === "required" && <p>El campo es requerido</p>}
            {errors.mcTerreno?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>
            
            <div className={styles.formGroup}>
            <label htmlFor="">Ambientes</label>
            <input type="text" name="ambientes" id="ambientes" {...register("ambientes", {required:true, validate: may_cero})} className={styles.formInput}/>
            {errors.ambientes?.type === "required" && <p>El campo es requerido</p>}
            {errors.ambientes?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="">Baños</label>
            <input type="text" name="banos" id="banos" {...register("banos", {required:true, validate: may_cero})} className={styles.formInput}/>
            {errors.baños?.type === "required" && <p>El campo es requerido</p>}
            {errors.baños?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="cocheras" className={styles.formLabel}>Cocheras</label>
            <input type="text" name="cocheras" id="cocheras" {...register('cocheras', {required:true, validate: may_cero})} className={styles.formInput} />
            {errors.cocheras?.type === "required" && <p>El campo es requerido</p>}
            {errors.cocheras?.type === "validate" && <p>no puede ser cero ni negativo</p>}
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="fileInput" className={styles.formLabel}>Selecciona un archivo</label>
            <input type="file" id="fileInput" onChange={(e) => uploadFile(e.target.files[0])} className={styles.fileInput} />
            </div>

            <input type="submit" value="Enviar" className={styles.submitButton} />
        </form>
        </div>
    );
};

export default Form;
