import { useState } from 'react';
import styles from './NavBar.module.css';
import  SearchIcon  from '../../assets/cloudinary/iconSearch.svg';
import { Link } from 'react-router-dom';
import CasaIcono  from '../../assets/cloudinary/casaicono.svg';
import UserIcon  from '../../assets/cloudinary/UserIcon.svg';


const NavBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        document.getElementById('searchInput').style.color = value ? 'white' : '';
    };

    const handleInputFocus = () => {
        setIsSearchFocused(true);
    };

    const handleInputBlur = () => {
        setIsSearchFocused(false);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.navBarContainer}>
            
            <div className={styles.logoContainer}>
                <img src={CasaIcono} alt="CasaIcono" />
            </div>


            {/* Barra de búsqueda */}
            <div className={styles.searchBar}>
                <div className={styles.searchHeader}>
                    <input
                        id="searchInput"
                        type="text"
                        placeholder={isSearchFocused || inputValue ? '' : 'Buscar propiedad'}
                        value={inputValue}
                        className={styles.searchInput}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <div className={styles.circle}>
                        <img src={SearchIcon} className={styles.searchIcon}/>
                    </div>
                </div>
            </div>
            <button className={styles.searchButton}>
                + Crear publicación
            </button>

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
