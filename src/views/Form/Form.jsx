import { uploadFiles } from "../../firebase/config";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postDeptoAsync, getProvincias } from "../../redux/actions";
import styles from "./form.module.css";
import NavBar from "../../componentes/navBar/NavBar";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { may_cero } from "./validator";

const Form = () => {
  const [img, setImg] = useState();
  console.log(img);
  const [section, setSection] = useState(1);
  const dispatch = useDispatch();
  const provincias = useSelector((state) => state.counter.provincias);
  const userStorage = localStorage.getItem( "user" );
  const user = JSON.parse( userStorage );
  
  console.log(user)
  useEffect(() => {
    if(!provincias.length){
      dispatch(getProvincias())
    }
  }, []);
  
  

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  
  const handleIncrement = (field) => {
    const value = parseInt(getValues(field), 10) || 0;
    setValue(field, Math.min(value + 1, 10));
  };

  const handleDecrement = (field) => {
    const value = parseInt(getValues(field), 10) || 0;
    setValue(field, Math.max(value - 1, 0));
  };

  
  const onSubmit = async (data) => {
    if (section === 1) {
      // Primera sección del formulario
      setSection(2);
    } else {
      // Segunda sección del formulario
      if (!img || img.length === 0) {
        console.error("Debes seleccionar al menos un archivo para subir.");
        // Puedes mostrar un mensaje al usuario o manejar de otra manera
        return;
      }
  
      try {
        console.log("Data antes de enviar:", data);
  
        const result = await uploadFiles(img);
        data.img = result;
        data.userId = user._id
        console.log(result);
  console.log(data);
        dispatch(postDeptoAsync(data));
        reset();
      } catch (error) {
        console.error("Error al subir archivos:", error);
      }
    }
  };
  

  const handleChange = (event) =>{
    setValue(event.target.name, event.target.value)
    trigger(event.target.name)
  }

  return (
    <div>
      <div className={styles.navBar}>
      <NavBar />
      </div>
    <div className={styles.formContainer}>

      <h2 className={styles.formTitle}> Formulario </h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {section === 1 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="titulo" className={styles.formLabel}>
                Titulo
              </label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                onChange={handleChange}
                {...register("titulo")}
                className={styles.formInput}
                placeholder="Dpto a estrenar en Nueva Cordoba"
              />
              {errors.descripcion?.type === 'required' && (
                <p className={styles.error}>Este campo es requerido</p>
              )}
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
                onChange={handleChange}
                {...register('descripcion', {
                  required: true,
                  minLength: 100,
                  maxLength: 350,
                })}
                placeholder="Departamento en Buenos Aires, dos Habitaciones"
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
              <label htmlFor="mcTerreno">Metros cuadrados</label>
              <input
                type="text"
                name="mcTerreno"
                id="mcTerreno"
                onChange={handleChange}
                {...register("mcTerreno", {
                  required: "El campo es requerido",
                  validate: may_cero,
                })}
                className={styles.formInput}
                placeholder="150m2"
              />
              {errors.descripcion?.type === 'required' && (
                <p className={styles.error}>Este campo es requerido</p>
              )}
              {errors.mcTerreno?.type === "validate" && (
                <p>no puede ser cero ni negativo</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="precio" className={styles.formLabel}>
                Precio
              </label>
              <input
                type="text"
                name="precio"
                id="precio"
                onChange={handleChange}
                {...register("precio", {
                  required: "El campo es requerido",
                  validate: may_cero,
                })}
                className={styles.formInput}
                placeholder="$15000"
              />
              {errors.descripcion?.type === 'required' && (
                <p className={styles.error}>Este campo es requerido</p>
              )}
              {errors.precio?.type === "validate" && (
                <p>El precio no puede ser cero ni negativo</p>
              )}
            </div>

            <button type="submit" className={`${styles.submitButton} ${styles.nextButton}`}>
              Siguiente
            </button>
          </>
        )}

        {section === 2 && (
          <>

            <div className={styles.formGroup}>
              <label htmlFor="habitaciones" className={styles.formLabel}>
                Habitaciones
              </label>
              <div className={styles.inputGroup}>
              <button
                  type="button"
                  className={styles.decrementButton}
                  onClick={() => handleDecrement("habitaciones")}
                >
                  -
                </button>
                <input
                  type="text"
                  name="habitaciones"
                  id="habitaciones"
                  onChange={handleChange}
                  {...register("habitaciones")}
                  className={styles.formInputSeccionDos}
                />

                <button
                  type="button"
                  className={styles.incrementButton}
                  onClick={() => handleIncrement("habitaciones")}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cocheras" className={styles.formLabel}>Cocheras</label>
              <div className={styles.inputGroup}>
              <button
                  type="button"
                  className={styles.decrementButton}
                  onClick={() => handleDecrement("cochera")}
                >
                  -
                </button>
                <input 
                  type="text"
                  name="cocheras"
                  id="cocheras"
                  onChange={handleChange}
                  className={styles.formInputSeccionDos}
                  {...register('cochera') }
                />

                <button
                  type="button"
                  className={styles.incrementButton}
                  onClick={() => handleIncrement("cochera")}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="baños">Baños</label>
              <div className={styles.inputGroup}>
                <button
                  type="button"
                  className={styles.decrementButton}
                  
                  onClick={() => handleDecrement("baños")}
                >
                  -
                </button>
                <input
                  type="text"
                  name="baños"
                  id="baños"
                  onChange={handleChange}
                  {...register("baños", {
                    required: "El campo es requerido",
                    validate: may_cero,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  className={styles.formInputSeccionDos}
                />

                <button
                  type="button"
                  className={styles.incrementButton}
                  onClick={() => handleIncrement("baños")}
                >
                  +
                </button>
              </div>
              {errors.baños && <p className={styles.error}>{errors.baños.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ambientes">Ambientes</label>
              <div className={styles.inputGroup}>
              <button
                  type="button"
                  className={styles.decrementButton}
                  onClick={() => handleDecrement("ambientes")}
                >
                  -
                </button>
                <input
                  type="text"
                  name="ambientes"
                  id="ambientes"
                  onChange={handleChange}
                  {...register("ambientes", {
                    required: "El campo es requerido",
                    validate: may_cero,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  className={styles.formInputSeccionDos}
                />
                <button
                  type="button"
                  className={styles.incrementButton}
                  onClick={() => handleIncrement("ambientes")}
                >
                  +
                </button>
              </div>
              {errors.ambientes && <p className={styles.error}>{errors.ambientes.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ciudad" className={styles.formLabel}>
                Ciudad
              </label>
              <input
                type="text"
                name="ciudad"
                id="ciudad"
                {...register("ciudad")}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fileInput" className={styles.formLabel}>
                Selecciona archivos
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setImg(e.target.files)}
                className={styles.fileInput}
                multiple // Habilita la selección de múltiples archivos
              />
            </div>
            <button
                type="button"
                onClick={() => setSection(1)}
                className={`${styles.submitButton} ${styles.backButton}`}>
                Volver
              </button>
            <input type="submit" value="Enviar" className={styles.submitButton} />
          </>
        )}
      </form>
    </div>
    </div>
  );
};

Form.propTypes = {
    //id: PropTypes.string.isRequired,
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

export default Form;