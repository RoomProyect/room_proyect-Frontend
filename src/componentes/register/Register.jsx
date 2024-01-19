import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postActionRegister } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './style.module.css'

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(postActionRegister(data));
    console.log(data);
  };

  return (
    <div className={style.divContainer}>
<Link to="/">Volver</Link>


<h1>Registro</h1>
    <form onSubmit={handleSubmit(onSubmit)}>





      <label >name</label>
      <input type="text" {...register('name')}/>

      <label >email</label>
      <input type="text" {...register('email')}/>

      <label >age</label>
      <input type="number" {...register('age')}/>

      <label >rol </label>
      <input type="text" {...register('rol')}/>

      <label >averageRating </label>
      <input type="number" {...register('averageRating')}/>
 <input type="submit"  />

    </form>
    </div>
  );
};

export default Register;