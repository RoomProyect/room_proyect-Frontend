import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
//import { postActionLogin } from "../../redux/actions";
import style from './style.module.css'
import { Link } from "react-router-dom";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth"
import { GoogleButton } from "react-google-button";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch()

  const onSubmit = (data) => {
   //dispatch(postActionLogin(data))
    // Aquí puedes manejar la lógica de inicio de sesión con los datos del formulario
    //console.log(data);
  };
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
    <div className={style.divContainer}>
        <div>
            <Link to='/'> VOLVER</Link>
        </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          //   ref={register({ required: "Este campo es obligatorio", pattern: /^\S+@\S+$/i })}
          />
        {/* {errors.email && <p>{errors.email.message}</p>} */}
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          //   ref={register({ required: "Este campo es obligatorio" })}
          />
        {/* {errors.password && <p>{errors.password.message}</p>} */}
      </div>

      <button type="submit">Iniciar sesión</button>
    </form>
      <div>
        <button onClick={handleClick}>
          Log in with google
        </button>
        <GoogleButton onClick={handleClick}/>
      </div>
    </div>

  );
};

export default Login;