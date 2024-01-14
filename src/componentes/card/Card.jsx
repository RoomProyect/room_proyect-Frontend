import { Link } from "react-router-dom";
import styles from "./Card.module.css";



const Card = ({ id, nombre, precio, image, descripcion, mc2 }) => {
    return (
        
        <div className={styles.card}>
            
            <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <Link to={`/detail/${id}`} >
                    <img src={image} alt={nombre} className={styles.image} />
                </Link>
            </div>
            <div className={styles.textContainer}>
                <p className={styles.nombre}>{nombre}</p>
                <p className={styles.precio} style={{ color: "#4F886B" }}>
                {precio}
                </p>
                <div className={styles.mc2Container}>
                <p className={styles.mc2}>{mc2}</p>
                </div>
                <p className={styles.descripcion}>
                {descripcion.length > 15
                    ? `${descripcion.substring(0, 15)}...`
                    : descripcion}
                </p>
            </div>
            </div>
            
        </div>
    
    );
};

export default Card;
