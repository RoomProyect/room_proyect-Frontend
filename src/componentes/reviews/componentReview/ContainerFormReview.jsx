import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import styles from './ContainerFormReview.module.css'
import { postReviews, updateUser } from '../../../redux/actions';


export const ContainerFormReview = ( { handleClose,userLoged } ) => {

  const { register,handleSubmit,formState: { errors } } = useForm();
  const btnReview = document.getElementById( 'addReview' );


  const dispatch =  useDispatch();
  
  const onHandleSubmit = ( data ) => {
    const idUser = userLoged[0]._id
    userLoged[0].review = true;
    const newPost = {
      text: data.review,
      user: idUser
    }
    handleClose();
    updateUser({_id: idUser, review: true});
    const updatedJsonString = JSON.stringify( userLoged[0] );
    localStorage.setItem( 'user', updatedJsonString );
    btnReview.style.display = 'none';
    dispatch( postReviews( newPost ) );
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
          name="text" 
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
