import { Link } from 'react-router-dom';
import styles from './card.module.css'; // Asegúrate de importar el archivo de estilos correcto

import cama from "../../assets/cloudinary/card/cama.svg";
import casa from "../../assets/cloudinary/card/casa.png";
import ducha from "../../assets/cloudinary/card/ducha.svg";
import ubi from "../../assets/cloudinary/card/ubi.svg";

import PropTypes from 'prop-types';

const Card = ({ id, baños, img, mcTerreno, precio, titulo, habitaciones, provincias }) => {

    return (
        <div className={styles.card}>
            <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                    <Link to={`/detail/${id}`}>
                        
                        <img src={img} alt={img} className={styles.image} />
                    </Link>
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.titulo}>{titulo}</p>
                    <div className={styles.infoContainer}>
                        <div className={styles.ubicacion}>
                                <img src={ubi} alt="provincias" className={styles.icono}/>{provincias}
                        </div>
                        <div className={styles.otroInfoContainer}>
                            <p className={styles.otroInfoItem}>
                                <img src={cama} alt="Cama" className={styles.icono} />
                                {habitaciones}
                            </p>
                            <p className={styles.otroInfoItem}>
                                <img src={casa} alt="Casa" className={styles.icono} />
                                {mcTerreno}m2
                            </p>
                            <p className={styles.otroInfoItem}>
                                <img src={ducha} alt="Ducha" className={styles.icono} />
                                {baños}
                            </p>
                        </div>
                    </div>
                    <p className={styles.precio}> {precio}$ </p>
                </div>
            </div>
        </div>
    );
};


Card.propTypes = {
    id: PropTypes.string.isRequired,
    ambientes: PropTypes.string.isRequired,
    baños: PropTypes.string.isRequired,
    cochera: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    mcTerreno: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    provincias: PropTypes.string.isRequired,
    habitaciones: PropTypes.string.isRequired,
};

export default Card;
