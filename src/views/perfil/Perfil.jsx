import { useEffect } from 'react';
import './perfil.css'; 

const Perfil = () => {

  const userStorage = localStorage.getItem( "user" );
  const user = JSON.parse( userStorage );
  console.log(user)

  useEffect(() => {
    const handleClick = (e) => {
      if (e.which !== 1) return false;

      document.querySelector('.card--front').classList.toggle('card--front--flip');
      document.querySelector('.card--back').classList.toggle('card--back--flip');
    };

    const handleLinkClick = (e) => {
      e.stopPropagation();
    };

    document.addEventListener('mouseup', handleClick);
    document.querySelectorAll('a').forEach((link) => link.addEventListener('mouseup', handleLinkClick));

    return () => {
      document.removeEventListener('mouseup', handleClick);
      document.querySelectorAll('a').forEach((link) => link.removeEventListener('mouseup', handleLinkClick));
    };
  }, []);

  return (
    <div className="container">
      <div className="card card--front">
        <div className="logo">

        </div>
        <div className="text">
          <header className="head">
            <h1 className="head__name">
              <b className="name__fn">{user[0].name}</b>
    
            </h1>
            <p className="head__subtitle"><p>Email: {user[0].email}</p></p>
          </header>
        </div>
      </div>

      <div className="card card--back">
        <div className="card__content">
          <ul className="contact">       
            <li><p>Email: {user[0].email}</p></li>
            <li><p>Nombre: {user[0].name}</p></li> 
            <li><p>Activo: {user[0].active ? 'Sí' : 'No'}</p></li>
            <li><p>Rol: {user[0].rol}</p></li>
          </ul>
        </div>
      </div>

      <div className="card-shadow"></div>
    </div>
  );
};

export default Perfil;
