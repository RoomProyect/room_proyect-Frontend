import { uploadFiles } from "../../firebase/config";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postDeptoAsync, getProvincias } from "../../redux/actions";
import styles from "./form.module.css";
import NavBar from "../../componentes/navBar/NavBar";
import { useState, useEffect } from "react";
import { may_cero } from "./validator";
import { useNavigate } from 'react-router-dom';
import Card from "../../componentes/card/Card";
import Swal from 'sweetalert2'


const Form = () => {
  const [img, setImg] = useState({});
  const [section, setSection] = useState(1);

  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userStorage = localStorage.getItem( "user" );
  const user = JSON.parse( userStorage );

  useEffect(()=>{
    const userStorage = localStorage.getItem( "user" );
    const user = JSON.parse( userStorage );

    if(user[0].rol !== "superadmin" && user[0].rol !== "admin"){       
        navigate('/home')
        Swal.fire({
          icon: 'warning',
          title: 'Usuario no puede ingresar',
          text: 'El usuario no tiene permisos para ingresar.',
        });
    }
    }, []);

    useEffect(() => {
      dispatch(getProvincias());
    }, []);


    const provincias = useSelector((state) => state.counter.provincias);

    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleProvinceChange = (event) => {
      const selectedProvinceName = event.target.value;
      const province = provincias.find((p) => p.nombre === selectedProvinceName);
      
      setSelectedProvince(province);
    
      setLatitud(province.centroide.lat);
      setLongitud(province.centroide.lon);
    };
  
  const [cardData, setCardData] = useState({
      titulo: '',
      descripcion: '',
      mcTerreno: '',
      precio: '',
      habitaciones: '',
      cocheras: '',
      baños: '',
      ambientes: '',
      provincia: '',
      img: [],
  });
  
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setCardData((prevData) => ({
      ...prevData,
      img: img.length > 0 ? img : prevData.img,
    }));
  
    if (section === 1) {
      // Primera sección del formulario
      setSection(2);
    } else {
      // Segunda sección del formulario
      if ( !img || img.length === 0 ) {
        Swal.fire({
          icon: 'success',
          title: `¡Faltan datos!`,
          text: 'Tiene que agregar al menos 1.',
        });
        return;
      }
  
      try {
        if (img.length >= 10 && img.length <= 4) {
          alert("entre 4 y 10");
        }
        
        const result = await uploadFiles(img);
  
        setCardData((prevData) => ({
          ...prevData,
          titulo: data.titulo,
          descripcion: data.descripcion,
          mcTerreno: data.mcTerreno,
          precio: data.precio,
          habitaciones: data.habitaciones,
          cocheras: data.cocheras,
          baños: data.baños,
          ambientes: data.ambientes,
          provincias: data.provincia,
          img: result, // Actualiza img con el resultado de la carga
        }));
  
        const provinciaSeleccionada = selectedProvince ? selectedProvince.nombre : '';
        data.img = result;
        data.userId = user[0]._id;
        data.latitud = latitud;
        data.longitud = longitud;
        data.provincias = provinciaSeleccionada;
  
 
  
        dispatch(postDeptoAsync(data));
        reset();

      setTimeout(() => {
        navigate('/home');
      }, 7000);

      } catch (error) {
        Swal.fire({
          icon: 'warning',
          title: `¡Faltan datos!`,
          text: 'Tiene que agregar al menos una imagen.',
        });
        console.error("Error al subir archivos:", error);
      }
    }
  };
  
  const handleIncrement = (field) => {
    const value = parseInt(getValues(field), 10) || 0;
    setValue(field, Math.min(value + 1, 10));
  };

  const handleDecrement = (field) => {
    const value = parseInt(getValues(field), 10) || 0;
    setValue(field, Math.max(value - 1, 0));
  };


  
  const handleFileChange = (e) => {
    setImg(e.target.files);
  };
  

  const handleChange = (event) => {
    setValue(event.target.name, event.target.value);
    trigger(event.target.name);
  
    setCardData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  
  return (
    <div>
      <div className={styles.navBar}>
      <NavBar />
      </div>
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}> Formulario </h2>
      <div className={styles.cardForm}>
        <Card {...cardData} />
      </div>
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
                {...register("titulo")}
                onChange={handleChange}
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
                {...register('descripcion', {
                  required: true,
                  minLength: 100,
                  maxLength: 350,
                })}
                onChange={handleChange}
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
                {...register("mcTerreno", {
                  required: "El campo es requerido",
                    validate: may_cero,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    }
                })}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="150m2"
              />
              {errors.mcTerreno && (
                <p className={styles.error}>{errors.mcTerreno.message}</p>
              )}
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
                {...register("precio", {
                  required: "El campo es requerido",
                  validate: may_cero,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo se permiten números",
                  }
                })}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="$15000"
              />
              {errors.precio && (
                <p className={styles.error}>{errors.precio.message}</p>
              )}
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
                  {...register("habitaciones")}
                  onChange={handleChange}
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
                  className={styles.formInputSeccionDos}
                  {...register('cochera') }
                  onChange={handleChange}
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
                  {...register("baños", {
                    required: "El campo es requerido",
                    validate: may_cero,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  onChange={handleChange}
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
                  {...register("ambientes", {
                    required: "El campo es requerido",
                    validate: may_cero,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  onChange={handleChange}
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
              <select
                className={styles.formSelectSeccionDos}
                name="provincia"
                {...register('provincia')}
                onChange={handleProvinceChange}
              >
                {provincias.length > 0 ? (
                  provincias.map((provincia, index) => (
                    <option key={index} value={provincia.nombre}>
                      {provincia.nombre}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Cargando provincias...
                  </option>
                )}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fileInput" className={styles.formLabel}>
                Selecciona archivos
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className={styles.fileInput}
                multiple 
              />
            </div>
            <input
              type="text"
              name="latitud"
              id="latitud"
              {...register('latitud', { value: latitud })}
              readOnly
              style={{ display: 'none' }}
            />
            <input
              type="text"
              name="longitud"
              id="longitud"
              {...register('longitud', { value: longitud })}
              readOnly
              style={{ display: 'none' }}
            />
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


export default Form;