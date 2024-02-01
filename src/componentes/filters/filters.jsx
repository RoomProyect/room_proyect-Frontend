import { useState } from 'react';
import styles from './filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getActionFiltered, paginateFilter, resetFilter } from '../../redux/actions';
import { useEffect } from 'react';

const Filters = () => {
    const filterG = useSelector( (state) => state.counter.filter );
    
    const [cochera, setCochera] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [filter, setFilter] = useState({
        max: "max",
        min: "min",
        precio_max: "",
        precio_min: "",
        sortByP: "",
        page: "1",
        cochera: "",
        provincias: ""
    });

    const dispatch = useDispatch();

    const deptos = useSelector((state) => state.counter.deptos);
    
    
    useEffect(() => {
        // La lógica que depende del estado actualizado debe ir aquí
        dispatch(getActionFiltered(filter));
    }, [filter]);

    const handleInputChange = (event, setter) => {
        const value = event.target.value;
        setter(value);
        if(event.target.name == "max" && precioMin){
            setFilter ({...filter, precio_max: value, precio_min: precioMin, max: "max", min: "min"})      
        }else{
            if(event.target.name == "min" && precioMax){
                setFilter({...filter, precio_max: precioMax, precio_min: value, max: "max", min: "min"})         
            }else{
                
                if (event.target.name === "max") {
                    setFilter(prevFilter => ({ ...prevFilter, precio_max: value, max: "max" }));
                }
                if (event.target.name === "min") {
                    setFilter(prevFilter => ({ ...prevFilter, precio_min: value, min: "min" }));
                }                
            }
        }
        if(event.target.name == "cochera"){
            setFilter({...filter, cochera: event.target.value})
        }
    };

    const handleSelecOrd = (event) =>{
        setFilter({...filter, sortByP: event.target.value})
        }

    const handleSearch = () => {
        let deptosFiltrados = [...deptos];
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
        
        setPrecioMax("")
        setPrecioMin("")
        setFilter({
            max: "max",
            min: "min",
            precio_max: "",
            precio_min: "",
            sortByP: "",
            page: "1",
            cochera: ""
        })
        dispatch(resetFilter(filter))
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <label className={styles.label}>
                    Ordenar por Precio
                    <select className={styles.input} name="sortByP" onChange={handleSelecOrd}>
                        <option value="default">---</option>
                        <option value={-1}>mayor a menor</option>
                        <option value={1}>menor a mayor</option>
                    </select>
                </label>
                <label className={styles.label}>
                    Cochera:
                    <select
                        type="string"
                        name="cochera"
                        onChange={(e) => handleInputChange(e, setCochera)}
                        className={styles.input}
                        min="0"
                    >   
                        <option value=""> -</option>
                        <option value="true"> si</option>
                        <option value="false"> no</option>
                    </select>


                </label>

                <label>
                    Precio mínimo:
                    <input
                        name="min"
                        type="number"
                        value={filterG.precio_min}
                        className={styles.input}
                        onChange={(e) => handleInputChange(e, setPrecioMin)}
                    />
                </label>

                <label>
                    Precio máximo:
                    <input
                        name="max"
                        type="number"
                        value={filterG.precio_max}
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
