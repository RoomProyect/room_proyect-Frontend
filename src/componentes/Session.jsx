import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás utilizando React Router para la navegación

const Session = () => {
  // Obtener la información del Local Storage
  const userDataString = localStorage.getItem('usuario');

  // Verificar si la información está presente
  const isLoggedIn = userDataString !== null && userDataString !== undefined;

  return (
    <div>
      {isLoggedIn ? (

        <>
          <span>Bienvenido</span>
          <button
            onClick={() => {
  
              localStorage.removeItem('usuario');
  
            }}
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
       
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </div>
  );
};

export default Session;