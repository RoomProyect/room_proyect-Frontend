import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postActionRegister } from '../../redux/actions';

const Register = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    dispatch(postActionRegister(data));
    console.log(data);
  };

  return (
    <div>

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