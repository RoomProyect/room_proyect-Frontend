import React from 'react'
import  './newFilters.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDeptoFiltered } from '../../redux/slice/counterSlice'; 


const NewFilters = () => {

    // const dispatch = useDispatch();

    // const deptos = useSelector((state) => state.counter.deptos);

    // const handleFilterClick = (filtro) => {
    //     dispatch(getDeptoFiltered(filtro));
    // };

    return (
    <div className='filtritoConteiner'>
        {/* {console.log("deptooos",deptos)} */}
        <button className='filtrito' >Filtrar</button>
        <button className='filtrito' >Con cochera</button>
        <button className='filtrito' >De 4 Ambientes</button>
        <button className='filtrito' >De 3 Habitaciones</button>
        <button className='filtrito' >Con 3 Baños</button>
        <button className='filtrito' >Minimo 60m2</button>
        <button className='filtrito' >Maximo de 7 mil $</button>
    </div>
    )
}

export default NewFilters