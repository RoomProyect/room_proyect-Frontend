

export const Perfil = () => {

    const dataUserLogin = localStorage.getItem( "user" );

  return (
    <>
        <div>This is your profile</div>

        <pre>{ dataUserLogin }</pre>    
    </>

  )
}
