// Register.js
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postActionRegister } from '../../redux/actions';
import style from './Register.module.css';
import NavBar from '../../componentes/navBar/NavBar'

import { Link } from "react-router-dom";

import dptoUnoLogin from "../../assets/cloudinary/Login/dptoUnoLogin.jpg";
import dptoTresLogin from "../../assets/cloudinary/Login/dptoTresLogin.jpg";
import dptoCincoLogin from "../../assets/cloudinary/Login/dptoCincoLogin.jpg";
import dptoSeisLogin from "../../assets/cloudinary/Login/dptoSeisLogin.jpg";

import GoogleIcon from "../../assets/cloudinary/google.svg"

const Register = () => {

    const images = [
        dptoUnoLogin,
        dptoTresLogin,
        dptoCincoLogin,
        dptoSeisLogin
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
    }, [currentIndex, images.length]);


    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        dispatch(postActionRegister(data));
        console.log(data);
    };

    return (
        <div>
        <NavBar/>
        <div className={style.divContainer}>
            
            <div className={style.imgLogin}>
                <img
                src={images[currentIndex]}
                alt={`Imagen ${currentIndex + 1}`}
                className={style.carouselImg}
                />
            </div>

            <div className={style.formContainer}>
            <h1 className={style.title}>Registrarme</h1>
                <div className={style.inputContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.inputGroupNA}>
                        <div className={style.nombre}>
                        <label htmlFor="name">Nombre:</label>
                        <input 
                        className={style.nombreAInput} 
                        type="text" 
                        {...register('name')} 
                        id="name" 
                        placeholder="Pepe" 
                        />
                        </div>
                        <div className={style.apellido}>
                        <label htmlFor="Apellido">Apellido:</label>
                        <input 
                        className={style.nombreAInput} 
                        type="text" 
                        {...register('Apellido')} 
                        id="Apellido" 
                        placeholder="Argento" 
                        />
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="email" className={style.emailLabel}>Email:</label>
                        <input 
                        placeholder="Example@email.com" 
                        className={style.emailInput} 
                        type="text" {...register('email')} 
                        id="email" />
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="Telefono" className={style.emailLabel}>Telefono:</label>
                        <input 
                        placeholder="+5429453493024" 
                        className={style.emailInput} 
                        type="text" {...register('email')} 
                        id="Telefono" />
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="Contrasenia" className={style.emailLabel}>Contrasenia:</label>
                        <input 
                        placeholder="Al menos 8 caracteres" 
                        className={style.emailInput} 
                        type="text" {...register('Contrasenia')} 
                        id="Contrasenia" />
                    </div>

                    <div className={style.inputGroup}>
                        <input 
                        placeholder="Confirmar contrasenia" 
                        className={style.emailInput} 
                        type="text" {...register('Contrasenia')} 
                        id="Contrasenia" />
                    </div>


                    <input className={style.submit} type="submit" /> 

                    <div className={style.linea}></div>

                    <button className={style.btnIniciarGoogle} type="submit"> <img src={GoogleIcon} className={style.googleImg} alt="" />Iniciar con Google</button>

                    <div className={style.containerRegister}>
                        <h2 className={style.sinCuenta}>¿Ya tienes cuenta?  </h2><Link to='/login' className={style.registerSolo}>Inicia sesión</Link>
                    </div>               
                </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Register;
