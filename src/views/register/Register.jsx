import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import {useEffect} from 'react'
import { postUserData } from '../../redux/slice/userSlice';
import style from './Register.module.css';
import NavBar from '../../componentes/navBar/NavBar'
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth"

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
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();
    const user  = useSelector((state) => state.user.data)
    
    const onSubmit = (data) => {
        console.log(data);
        dispatch(postUserData(data))
        reset()
    };

    const handleChange = (event) =>{
        setValue(event.target.name, event.target.value)
        trigger(event.target.name)
    }

    const handleClick = () =>{
        const auth = getAuth();
        const providerGoogle = new GoogleAuthProvider(); 
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
    
            // The signed-in user info.
            const user = result.user;
            const data = {name: user.displayName, email: user.email}
            const response = dispatch(postUserData(data))
            console.log(user)
    
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            }).catch((error) => {
            // Handle Errors here.
            window.alert(error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    if(user){
        navigate('/home')
    }
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

                    <button className={style.btnIniciarGoogle} onClick={handleClick} type="submit"> <img src={GoogleIcon} className={style.googleImg} alt="" />Iniciar con Google</button>

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
