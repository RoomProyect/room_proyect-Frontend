import styles from './Home.module.css';
import Navbar from '../../componentes/navBar/NavBar';
import Filters from '../../componentes/filters/filters';
import Cards from "../../componentes/cards/Cards"
import Footer from '../../componentes/footer/footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getDeptoAsync, nextPage, prevPage } from '../../redux/actions'; 


const Home = () => {

    const dispatch = useDispatch();
    const deptos = useSelector( (state) => state.counter.deptos );
    const paginate = useSelector ( state => state.counter.paginado );

    useEffect(()=>{
        dispatch(getDeptoAsync( paginate.pageActual ))
    }, [dispatch, paginate.pageActual])

    const handleChangePage = ( event ) => {
        if( event.target.name === 'next' && paginate.pageActual < paginate.totalPages ){
            dispatch( nextPage() );
        }
        if( event.target.name === 'back' && paginate.pageActual > 1 ){
            dispatch( prevPage() );
        }
    }

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
            <div className={ styles.contentFilters }>
                <Filters/>
            </div>
            <div className={ styles.contentCards }>
                    <Cards deptos={ deptos }/>
            </div>
            <div className={styles.contentPaginate}>
                    <button name="back" onClick={handleChangePage} className={styles.paginateButton}>
                        Back
                    </button>
                        <span>{paginate.pageActual}/{paginate.totalPages}</span>
                    <button name="next" onClick={handleChangePage} className={styles.paginateButton}>
                        Next
                    </button>
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    );
};

export default Home;