import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postActionLogin } from "../../redux/actions";
import style from './style.module.css'
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch()

  const onSubmit = (data) => {
   dispatch(postActionLogin(data))
    // Aquí puedes manejar la lógica de inicio de sesión con los datos del formulario
    console.log(data);
  };



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
          </div>
  );
};

export default Login;