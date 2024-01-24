import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { postActionLogin } from "../../redux/actions";
import style from './Login.module.css'
import NavBar from '../../componentes/navBar/NavBar'

import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth"

import { Link } from "react-router-dom";

// Importa las imágenes
import dptoUnoLogin from "../../assets/cloudinary/Login/dptoUnoLogin.jpg";
import dptoTresLogin from "../../assets/cloudinary/Login/dptoTresLogin.jpg";
import dptoCincoLogin from "../../assets/cloudinary/Login/dptoCincoLogin.jpg";
import dptoSeisLogin from "../../assets/cloudinary/Login/dptoSeisLogin.jpg";

import GoogleIcon from "../../assets/cloudinary/google.svg"

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch(postActionLogin(data));
    // console.log(data);
  };

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

  const auth = getAuth();
  
  const handleClick = () =>{
    const providerGoogle = new GoogleAuthProvider(); 
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
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



  return (
    <div className={style.navBar}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.title}>
            <h1>Iniciar Sesión</h1>
          </div>
          <div className={style.inputContainer}>
            <div className={style.inputGroup}>
              <label className={style.emailLabel}>Email:</label>
              <input className={style.emailInput} type="text" name="email" placeholder="Example@email.com" />
            </div>
            <div className={style.inputGroup}>
              <label className={style.passwordLabel}>Contraseña:</label>
              <input className={style.passwordInput} type="password" name="password" placeholder="Minimo 8 caracteres" />
            </div>
            <div><h2 className={style.resClave}>Olvidaste tu contraseña?</h2></div>
          </div>
          <button className={style.btnIniciarSesion} type="submit">Iniciar sesión</button>
        </form>
        <div className={style.linea}></div>
        <button className={style.btnIniciarGoogle} onClick={handleClick} type="submit"> <img src={GoogleIcon} className={style.googleImg} alt="" />Iniciar con Google</button>      
          <div className={style.containerRegister}>
            <h2 className={style.sinCuenta}>¿Todavía no tienes cuenta? </h2> <Link to='/register' className={style.registerSolo}> Regístrate </Link>
          </div> 
      </div>
    </div>
    </div>
  );
};

export default Login;
