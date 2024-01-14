import styles from './Home.module.css';
import Navbar from '../../componentes/navBar/NavBar';
// import Card from '../../componentes/card/Card';

const Home = () => {

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
        <div className={styles.cardContainer}>
            {/* {cardsToShow.map((depto) => ( */}
            {/* <Card
                // key={depto.id}
                // {...depto}
            /> */}
            
        </div>
        </div>
    );
};

export default Home;
