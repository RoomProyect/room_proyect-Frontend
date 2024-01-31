import { Link } from 'react-router-dom';
import styles from './card.module.css';
import cama from "../../assets/cloudinary/card/cama.svg";
import casa from "../../assets/cloudinary/card/casa.png";
import ducha from "../../assets/cloudinary/card/ducha.svg";
import ubi from "../../assets/cloudinary/card/ubi.svg";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Card = ({ id, baños, img, mcTerreno, precio, titulo, habitaciones, provincias  }) => {

    const [localData, setLocalData] = useState({
        titulo: '',
        img: '',
        provincias: '',
        habitaciones: '',
        mcTerreno: '',
        baños: '',
        precio: '',
    });

    useEffect(() => {
        setLocalData({
        titulo,
        img,
        provincias,
        habitaciones,
        mcTerreno,
        baños,
        precio,
        });
    }, [titulo, img, provincias, habitaciones, mcTerreno, baños, precio]);

    return (
        <div className={styles.card}>
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
            <Link to={`/detail/${id}`} >
                <img src={localData.img} alt={localData.titulo} className={styles.image} />
            </Link>
            </div>
            <div className={styles.textContainer}>
            <p className={styles.titulo}>{localData.titulo}</p>
            <div className={styles.infoContainer}>
                <div className={styles.ubicacion}>
                <img src={ubi} alt="provincias" className={styles.icono} /> {localData.provincias}
                </div>
                <div className={styles.otroInfoContainer}>
                <p className={styles.otroInfoItem}>
                    <img src={cama} alt="Cama" className={styles.icono} />
                    {localData.habitaciones}
                </p>
                <p className={styles.otroInfoItem}>
                    <img src={casa} alt="Casa" className={styles.icono} />
                    {localData.mcTerreno}m2
                </p>
                <p className={styles.otroInfoItem}>
                    <img src={ducha} alt="Ducha" className={styles.icono} />
                    {localData.baños}
                </p>
                </div>
            </div>
            <p className={styles.precio}> {localData.precio}$ </p>
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
    habitaciones: PropTypes.string.isRequired
};

export default Card;
