// Register.js
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postActionRegister } from '../../redux/actions';
import style from './Register.module.css';


import dptoUnoLogin from "../../assets/cloudinary/Login/dptoUnoLogin.jpg";
import dptoTresLogin from "../../assets/cloudinary/Login/dptoTresLogin.jpg";
import dptoCincoLogin from "../../assets/cloudinary/Login/dptoCincoLogin.jpg";
import dptoSeisLogin from "../../assets/cloudinary/Login/dptoSeisLogin.jpg";

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
                    <input className={style.submit} type="submit" />               
                </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
