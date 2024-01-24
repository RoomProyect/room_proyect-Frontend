import styles from './perfil.module.css'

export const Perfil = () => {

    const dataUserLogin = localStorage.getItem( "user" );
    const data = JSON.parse(dataUserLogin);
    console.log(data)
  return (
    <>
        <div className={styles.container}></div>

        <pre>{ data.email }</pre>    

    </>

  )
}
