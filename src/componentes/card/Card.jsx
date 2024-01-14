import { Link } from "react-router-dom";
import styles from "./cards.module.css";

const Card = ({ id, ambientes, baños, cochera, descripcion, img, mcTerreno, precio }) => {
    return (
        // <Link to={`/detail/${id}`} className={styles.cardLink}>
        <div className={styles.card}>
            <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img src={img}  className={styles.image} />
            </div>
            <div className={styles.textContainer}>
                <p className={styles.nombre}> AMBIENTES : {ambientes}</p>
                <p className={styles.precio} style={{ color: "#4F886B" }}>
                PRECIO: {precio}
                </p>
                <div className={styles.mc2Container}>
                <p className={styles.mc2}>BAÑOS: {baños}</p>
                </div>
                <p className={styles.descripcion}>
                {/* {descripcion.length > 15
                    ? `${descripcion.substring(0, 15)}...`
                    : descripcion} */}
                </p>
                <p>COCHERA : {cochera}</p>
                <p>DESCRIPCION : {descripcion}</p>
            </div>
            </div>
        </div>
    // </Link>
    );
};

export default Card;
