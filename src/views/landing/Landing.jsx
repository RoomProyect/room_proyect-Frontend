import { useState } from 'react';
import styles from './Landing.module.css';
import SearchIcon  from '../../assets/cloudinary/iconSearch.svg';
import MauseBottom  from '../../assets/cloudinary/mauseBottom.svg';
import { Link } from 'react-router-dom';
import UserIcon  from '../../assets/cloudinary/userIcon.svg';

const Landing = () => {
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
        <div className={styles.landingContainer}>
            <div className={styles.navBar}>
                <div className={styles.navBarLeft}>
                    <div className={styles.title}></div>
                </div>
                <div className={styles.navBarRigth}>
                    <div className={`${styles.userContainer} mt-3`}>
                        <Link to="#" className={styles.customUserIcon} onClick={handleMenuToggle}><img src={UserIcon} alt="UserIcon" /> </Link>
                    </div>
                    {isMenuOpen && (
                        <div className={styles.hamburgerMenuContainer}>
                            <div className={styles.hamburgerMenu}>
                                <Link to="/login" className={styles.menuItem}>Iniciar Sesión</Link>
                                <Link to="/register" className={styles.menuItem}>Registrarse</Link>
                                <Link to="/perfil" className={styles.menuItem}>Perfil</Link>
                                <Link to="/form" className={styles.menuItem}>Agregar alojamiento</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.contentContainer}>
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
                            <img src={SearchIcon} alt="CasaIcono" />
                        </div>
                    </div>
                    <button className={`bi bi-plus custom-plus-icon ${styles.bottonDownSearchBar}`}>
                        <Link to="/form" className={styles.menuItem}>Agregar alojamiento</Link>
                    </button>
                    <Link to="/home" >
                        <button className={styles.bottonDownSearchBar}>
                            Ver Catalogo de Hospeajes
                        </button>
                    </Link>
                </div>

            </div>
            <div className={styles.bottomLanding}>
                <div className={styles.mauseBottom}>
                    <img src={MauseBottom} alt="CasaIcono" />
                </div>
            </div>
        </div>
    );
};

export default Landing;
