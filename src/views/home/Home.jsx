import styles from './Home.module.css';
import Navbar from '../../componentes/navBar/NavBar';
import Filters from '../../componentes/filters/filters';
import Cards from "../../componentes/cards/Cards"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getDeptoAsync } from '../../redux/actions'; 


const Home = () => {

const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getDeptoAsync())
}, [])


const deptos = useSelector((state) => state.counter.deptos);

    return (
        <div className={styles.homeContainer}>
            
            <div className={styles.navBar}>
                <Navbar />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.imageContainer}></div>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>Encuentra Tu Hogar Ideal con Nosotros</h1>
                        <p className={styles.subtitle}>
                            Descubre una amplia selección de departamentos en las mejores ubicaciones.
                            Ofrecemos los mejores precios y la confianza que necesitas para encontrar tu hogar
                            ideal en Argentina. Con años de experiencia en el sector inmobiliario, te brindamos
                            completas opciones a los precios más bajos. ¡No esperes más para encontrar tu nuevo hogar!
                        </p>
                </div>
            </div>
            <div>
                <Filters/>
            </div>
            <div>
                <Cards deptos={deptos}/>
            </div>
<SearchBar />
        </div>
    );
};

export default Home;
