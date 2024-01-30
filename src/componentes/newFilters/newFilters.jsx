import React from 'react'
import  './newFilters.css';

const NewFilters = () => {
  return (
    <div className='filtritoConteiner'>
        <button className='filtrito'>Filtrar</button>
        <button className='filtrito'>Con cochera</button>
        <button className='filtrito'>De 4 Ambientes</button>
        <button className='filtrito'>De 3 Habitaciones</button>
        <button className='filtrito'>Con 3 Baños</button>
        <button className='filtrito'>Minimo 60m2</button>
        <button className='filtrito'>Maximo de 7 mil $</button>
    </div>
  )
}

export default NewFilters