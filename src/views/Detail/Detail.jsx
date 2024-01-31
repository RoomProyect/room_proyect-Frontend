import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import NavBar from '../../componentes/navBar/NavBar.jsx';
import styles from './Detail.module.css';
import PayButton from '../../componentes/Stripe/PayButton.jsx';
import cama from "../../assets/cloudinary/card/cama.svg";
import casa from "../../assets/cloudinary/card/casa.png";
import ducha from "../../assets/cloudinary/card/ducha.svg";
import ubi from "../../assets/cloudinary/card/ubi.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDeptoByIdAsync } from '../../redux/actions.js';


const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const vivienda = useSelector((state)=> state.counter.deptoById);


    useEffect(()=>{
        setIsLoading(false)
        dispatch(getDeptoByIdAsync( id )).then(()=>{
            setIsLoading(true)
        })
    },[])


    useEffect(() => {
        if (vivienda && vivienda.latitud && vivienda.longitud) {
            const map = L.map('map').setView([vivienda.latitud, vivienda.longitud], 13);
        
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
        }
    }, [vivienda]);


    function redirectToWhatsApp(phoneNumber) {
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${formattedPhoneNumber}`;
        window.open(whatsappLink, '_blank');
    }

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const mostrarImagenEnGrande = (imagen) => {
        setImagenSeleccionada(imagen);
    };

    const cerrarImagenEnGrande = () => {
        setImagenSeleccionada(null);
    };
    
    

    return (
        <>
        {isLoading ? (
            <>
            <div className={styles.navBarWrapper}>
                <NavBar />
            </div>
            <div className={styles.container}>
                <div className={styles.goBack}>
                <button onClick={() => navigate("/home")}> {"Back"}</button>
                </div>
                <div className={styles.propertyDetails}>
                    <img src={vivienda.img} alt="house-image" className={styles.propertyImage} />
                <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyTitle}>{vivienda.titulo}</h3>
                    <div className={styles.priceInfo}>
                        <span className={styles.priceValue}>Por: {vivienda.precio}$</span>
                    </div>
                    <div className={styles.descripcion}>
                        <span className={styles.descripcion}>{vivienda.descripcion}</span>
                    </div>
                    <div className={styles.tresImg}>
                        <div>
                            {vivienda.img.map((imagen, index) => (
                                <img
                                key={index}
                                src={imagen}
                                alt="house-image"
                                className={styles.tresImgIndividual}
                                onClick={() => mostrarImagenEnGrande(imagen)}
                                />
                            ))}
                            
                            {imagenSeleccionada && (
                                <div className={styles.overlay} onClick={cerrarImagenEnGrande}>
                                    <div className={styles.imagenEnGrandeContainer}>
                                        <img src={imagenSeleccionada} alt="house-image" className={styles.imagenEnGrande} />
                                    </div>
                                </div>
                            )}
                    </div>
                    </div>
                    <div id="map" style={{ height: '400px' }}></div>
                </div>
                </div>
                <div className={styles.detailsContainer}>
                <div className={styles.detail}>
                    <img src={cama} alt="Cama" className={`${styles.icono} ${styles.casa}`} />
                    <h6 className={styles.detailLabel}>Habitaciones: {vivienda.habitaciones}</h6>
                </div>
                <div className={styles.detail}>
                    <img src={ducha} alt="Ducha" className={styles.icono} />
                    <h6 className={styles.detailLabel}>Baños: {vivienda.baños}</h6>                   
                </div>
                <div className={styles.detail}>
                    <h6 className={styles.detailLabel}>Cochera: {vivienda.cochera}</h6>
                </div>
                <div className={styles.detail}>
                    <img src={ubi} alt="provincias" className={styles.icono}/>
                    <h6 className={styles.detailLabel}>Provincia: {vivienda.provincias}</h6>                    
                </div>
                <div className={styles.detail}>
                    <img src={casa} alt="Casa" className={styles.icono} />
                    <h6 className={styles.detailLabel}>mcTerreno: {vivienda.mcTerreno}</h6>
                </div>
            </div>
                <div className={styles.buyButtonContainer}>
                        <PayButton
                        items={vivienda}
                    />
                    <button className={styles.buyButton} onClick={() => redirectToWhatsApp('+123456789')}>
                        Consultar
                    </button>
                </div>
            </div>
            </>
        ) : (
            <>
            <div className={styles.navBarWrapper}>
                <NavBar />
            </div>
            <div className={styles.container}>
                <div className={styles.goBack}>
                <button onClick={() => navigate("/home")}> {"Back"}</button>
                <div className={styles.loading}>
                    CARGANDO...
                </div>
                </div>
            </div>
            </>
        )}
        </>
    );
};

export default Detail;