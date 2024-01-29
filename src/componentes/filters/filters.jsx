import { useState } from 'react';
import styles from './filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActionFiltered } from '../../redux/actions';

const Filters = () => {

    const [ciudad, setCiudad] = useState('');
    const [cochera, setCochera] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const dispatch = useDispatch();


    const deptos = useSelector((state) => state.counter.deptos);
    

    const handleInputChange = (event, setter) => {
        const value = event.target.value;
        setter(value);
        dispatch( getActionFiltered( [value, event.target.name] ) );
    };

    const handleSelecOrd = (event) =>{dispatch(getActionFiltered([event.target.value, event.target.name]))}

    const handleSearch = () => {
        let deptosFiltrados = [...deptos];

        if (ciudad) {
            deptosFiltrados = deptosFiltrados.filter(depto => depto.ciudad == ciudad)
        }
        if (cochera === "s") {
            deptosFiltrados = deptosFiltrados.filter((depto) => depto.cochera == true);
        }
        if (cochera === "n") {
            deptosFiltrados = deptosFiltrados.filter((depto) => depto.cochera == false);
        }

        if (precioMin || precioMax) {
            if (precioMin) {
                deptosFiltrados = deptosFiltrados.filter(depto => depto.precio < precioMin)
            }
        };
    }

    const handleClick = (event) =>{
        dispatch(getActionFiltered([event.target.value, event.target.name]))
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.label}>
                    Ordenar por Precio
                    <select className={styles.input} name="select" onChange={handleSelecOrd}>
                        <option value="default">---</option>
                        <option value="may_min">mayor a menor</option>
                        <option value="min_may">menor a mayor</option>
                    </select>
                </label>
                <label className={styles.label}>
                    Cochera:
                    <select
                        type="number"
                        onChange={(e) => handleInputChange(e, setCochera)}
                        className={styles.input}
                        min="0"
                    >
                        <option value="yes"> si</option>
                        <option value="no"> no</option>
                    </select>


                </label>

                <label>
                    Precio mínimo:
                    <input
                        name="min"
                        type="number"
                        value={precioMin}
                        className={styles.input}
                        onChange={(e) => handleInputChange(e, setPrecioMin)}
                    />
                </label>

                <label>
                    Precio máximo:
                    <input
                        name="max"
                        type="number"
                        value={precioMax}
                        className={styles.input}
                        onChange={(e) => handleInputChange(e, setPrecioMax)}
                    />
                </label>


                <button name = "reset" value={"reset"} className={styles.button} onClick={handleClick}>
                    Reset
                </button>

                <button className={styles.button} onClick={handleSearch}>
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default Filters;
