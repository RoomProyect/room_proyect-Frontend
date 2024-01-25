import { useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import CasaIcono  from '../../assets/cloudinary/casaicono.svg';
import UserIcon  from '../../assets/cloudinary/userIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import { setUser } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const userStorage = localStorage.getItem( "user" );
    const user = JSON.parse( userStorage );

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        dispatch(setUser(null))
        localStorage.removeItem( 'user' );
    }

    return (
        <div className={styles.navBarContainer}>
            
            <Link to="/home" >
                <div className={styles.logoContainer}>
                    <img src={CasaIcono} alt="CasaIcono" />
                </div>
            </Link>

            {/* Barra de búsqueda */}
            <SearchBar/>
            
            { user && (
                <Link to="/form" >
                    <button className={styles.searchButton}>
                        + Crear publicación
                    </button>
                </Link>
            )}

            <div className={styles.navBarRigth}>
                    <div className={styles.userContainer}>
                        <Link to="#" className={styles.customUserIcon} onClick={handleMenuToggle}><img src={UserIcon} alt="UserIcon" /> </Link>
                    </div>
                    {isMenuOpen && (
                        <div className={styles.hamburgerMenuContainer}>
                            <div className={styles.hamburgerMenu}>
                                { !user ? (
                                    <>
                                        <Link to="/login" className={styles.menuItem}>Iniciar Sesión</Link>
                                        <Link to="/register" className={styles.menuItem}> Registrarse</Link>
                                    </>
                                ) 
                                : (
                                    <>
                                        <Link to="/profile" className={styles.menuItem}>Perfil</Link>
                                        <Link to="/" onClick={ handleLogout } >Logout</Link>
                                        {user.SuperAdmin && (
                                            <>
                                                <Link to="/AdminUsers" className={styles.menuItem}>AdminUsers</Link>
                                                <Link to="/AdminPosts" className={styles.menuItem}>AdminPosts</Link>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default NavBar;
