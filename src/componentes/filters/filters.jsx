import { useEffect, useState } from 'react';
import styles from './filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActionFiltered } from '../../redux/actions';

const Filters = () => {

    const [ciudad, setCiudad] = useState('');
    const [cochera, setCochera] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch( getDeptoFiltered() );
    // }, [])

    const deptos = useSelector((state) => state.counter.deptos);
    

    const handleInputChange = (event, setter) => {
        const value = event.target.value;
        setter(value);
        dispatch( getActionFiltered( [value, event.target.name] ) );
    };

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

    const handleClick = () =>{
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.label}>
                    Ciudad:
                    <input
                        type="text"

                        onChange={(e) => handleInputChange(e, setCiudad)}
                        className={styles.input}
                        min="0"
                    />
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
                        onChange={(e) => handleInputChange(e, setPrecioMin)}
                    />
                </label>

                <label>
                    Precio máximo:
                    <input
                        name="max"
                        type="number"
                        value={precioMax}
                        onChange={(e) => handleInputChange(e, setPrecioMax)}
                    />
                </label>


                <button name = "reset" className={styles.button} onClick={handleClick}>
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
