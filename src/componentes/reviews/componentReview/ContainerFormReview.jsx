import { useForm } from 'react-hook-form'
import styles from './ContainerFormReview.module.css'

export const ContainerFormReview = ( { handleClose } ) => {

  const { register,handleSubmit,formState: { errors } } = useForm();

  const onHandleSubmit = ( data ) => {
    console.log( data );
    handleClose();
  }

  return (
    <div className={ styles.containerModal } id='modal' >
      <button id='btnClose' onClick={ handleClose } className={ styles.btnClose }>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={ styles.iconX } >
          <path 
            d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
          </path>
        </svg>
      </button>
      <form className={ styles.formReview } onSubmit={ handleSubmit(onHandleSubmit) } >
        <h3>Deja tu comentario!</h3>
        <textarea 
          name="review" 
          id="textAreaReview" 
          cols="60" 
          rows="10" 
          placeholder='Comentario aqui!'
          {...register("review", { required: true })}
        />
        {errors.review && <span className="error">Este campo es requerido</span>}
        <button type='submit' >Enviar</button>
      </form>
    </div>
  )
}
