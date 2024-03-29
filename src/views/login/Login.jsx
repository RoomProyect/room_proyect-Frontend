import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
//import { postActionLogin } from "../../redux/actions";
import style from './Login.module.css'
import NavBar from '../../componentes/navBar/NavBar'
import { getUsers, setUser } from "../../redux/actions";
import { signInWithPopup, getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { postUserData } from "../../redux/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";

// Importa las imágenes
import dptoUnoLogin from "../../assets/cloudinary/Login/dptoUnoLogin.jpg";
import dptoTresLogin from "../../assets/cloudinary/Login/dptoTresLogin.jpg";
import dptoCincoLogin from "../../assets/cloudinary/Login/dptoCincoLogin.jpg";
import dptoSeisLogin from "../../assets/cloudinary/Login/dptoSeisLogin.jpg";

import GoogleIcon from "../../assets/cloudinary/google.svg"
import Swal from 'sweetalert2'

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.user.data)

  useEffect(() => {
    let allUsers = true
    dispatch(getUsers(0, allUsers))
  }, []);

  const signin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        const usuario = users.find(el => el.email.toLowerCase() === user.email.toLowerCase());
        if (usuario.active === false) {
          Swal.fire({
            icon: 'warning',
            title: 'Usuario no puede ingresar',
            text: 'El usuario no tiene permisos para ingresar.',
          });
        } else {
          dispatch(setUser([usuario]))
          Swal.fire({
            icon: 'success',
            title: `¡Bienvenido, ${usuario.name}!`,
            text: 'Inicio de sesión exitoso.',
          });
          navigate('/home');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = errorCode.split('-');
        const exist = users.find(el => el.email.toLowerCase() === email.toLowerCase())
        if(errorMessage[1] === 'email'){
          Swal.fire({
            icon: 'warning',
            title: `¡El email es incorrecto!`,
          });
          setErrorLogin('email')
        } else if(!exist){
          Swal.fire({
            icon: 'warning',
            title: `¡El email no esta resgitrado!`,
          });
          setErrorLogin('email')
        } else if(errorMessage[1] === 'credential'){
          Swal.fire({
            icon: 'warning',
            title: `¡La contraseña es incorrecta!`,
          });
          setErrorLogin('contraseña')
        } 
      });

  }

  if (user) {
    const userStorage = JSON.stringify(user);
    localStorage.setItem('user', userStorage);
    navigate('/home');
  }

  const onSubmit = (data) => {
    //dispatch(postActionLogin(data));
  
    signin(data.email, data.password)
  };

  const images = [
    dptoUnoLogin,
    dptoTresLogin,
    dptoCincoLogin,
    dptoSeisLogin
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorLogin , setErrorLogin] = useState("")
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);



  const auth = getAuth();

  const handleClick = () => {
    const providerGoogle = new GoogleAuthProvider();
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        const user_ver = users.filter((el)=> el.email == user.email)
        if (user_ver[0] && user_ver[0].active == false) {
          Swal.fire({
            icon: 'warning',
            title: 'Usuario no puede ingresar',
            text: 'El usuario no tiene permisos para ingresar.',
          });
        }else
        if(user_ver.length){
          dispatch(setUser(user_ver))
          Swal.fire({
            icon: 'success',
            title: `¡Bienvenido, ${user_ver[0].name}!`,
            text: 'Inicio de sesión exitoso.',
          });
        } else {
          dispatch(postUserData({email: user.email, name: user.displayName}))               
        }
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
      <NavBar />
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
              <input style={(errorLogin === 'email' && { borderColor: "red" }) || null} className={style.emailInput} type="text" name="email" placeholder="Example@email.com" {...register("email")}/>
            </div>
            <div className={style.inputGroup}>
              <label className={style.passwordLabel}>Contraseña:</label>
              <input style={(errorLogin === 'contraseña' && { borderColor: "red" }) || null} className={style.passwordInput} type="password" name="password" placeholder="Minimo 8 caracteres" {...register("password")}/>
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
