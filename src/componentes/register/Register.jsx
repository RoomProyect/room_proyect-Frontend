import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postUserData } from '../../redux/slice/userSlice';
import GoogleButton from 'react-google-button';
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom';



const Register = () => {
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

    <h1>Registrarme</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

      <label >name</label>
      <input type="text" name='name' onChange={handleChange}{...register('name',{
        required:"Este campo es requerido",
      })}/>
      {errors.name && <p>{errors.name.message}</p>}

      <label >email</label>
      <input type="text" name='email' {...register('email',{
        required:"Este campo es requerido",
        pattern:{
          value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          message: "Debe ingresar un email"  
        }
      })}onChange={handleChange}/>
      {errors.email && <p>{errors.email.message}</p>}

      <label >age</label>
      <input type="number" name='age' {...register('age',{
        required:"Este campo es requerido",
      })}onChange={handleChange}/>
      {errors.age && <p>{errors.age.message}</p>}

      <label >averageRating </label>
      <input type="number" name='averageRating' {...register('averageRating',{
        required:"Este campo es requerido",
      })}onChange={handleChange}/>
      <input type="submit"  />
      {errors.averageRating && <p>{errors.averageRating.message}</p>}

    </form>
    <div>
      <GoogleButton onClick={handleClick}/>
    </div>
    </div>
  );
};

export default Register;