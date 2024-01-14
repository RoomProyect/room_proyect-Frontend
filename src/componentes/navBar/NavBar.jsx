import { useState } from 'react';
import styles from './NavBar.module.css';
import  SearchIcon  from '../../assets/cloudinary/iconSearch.svg';
import { Link } from 'react-router-dom';
import CasaIcono  from '../../assets/cloudinary/casaicono.svg';
import UserIcon  from '../../assets/cloudinary/UserIcon.svg';
import SearchBar from '../SearchBar/SearchBar';


const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.navBarContainer}>
            
            <Link to="/home" >
                <div className={styles.logoContainer}>
                    <img src={CasaIcono} alt="CasaIcono" />
                </div>
            </Link>

            {/* Barra de búsqueda */}
            <div className={styles.searchBar}>
                <SearchBar/>
                {/* no son perfectos los estilos, falta searchIcon que no tiene funcion porque no hay redux aun */}
            </div>
            <Link to="/form" >
            <button className={styles.searchButton}>
                + Crear publicación
            </button>
            </Link>                            

            <div className={styles.navBarRigth}>
                    <div className={styles.userContainer}>
                        <Link to="#" className={styles.customUserIcon} onClick={handleMenuToggle}><img src={UserIcon} alt="UserIcon" /> </Link>
                    </div>
                    {isMenuOpen && (
                        <div className={styles.hamburgerMenuContainer}>
                            <div className={styles.hamburgerMenu}>
                                <Link to="/login" className={styles.menuItem}>Iniciar Sesión</Link>
                                <Link to="/register" className={styles.menuItem}>Registrarse</Link>
                                <Link to="/profile" className={styles.menuItem}>Perfil</Link>
                                <Link to="/form" className={styles.menuItem}>Agregar alojamiento</Link>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default NavBar;
