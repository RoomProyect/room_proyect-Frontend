import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../componentes/navBar/NavBar.jsx';
import styles from './Detail.module.css';
import PayButton from '../../componentes/Stripe/PayButton.jsx';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import ImgUno from '../../assets/cloudinary/fotosDetailPrueba/depto1.jpg';
import ImgDos from '../../assets/cloudinary/fotosDetailPrueba/depto2.jpg';
import ImgTres from '../../assets/cloudinary/fotosDetailPrueba/depto3.jpg';

import cama from "../../assets/cloudinary/card/cama.svg";
import casa from "../../assets/cloudinary/card/casa.png";
import ducha from "../../assets/cloudinary/card/ducha.svg";
import ubi from "../../assets/cloudinary/card/ubi.svg";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vivienda = useSelector((state) => {
        const response = state.counter.deptos.find((depto) => depto._id === id);
        return response;
    });

    const position = [-34.6118, -58.4173]; 
    console.log({
        position,
        vivienda
    })
    return (
        <React.Fragment>
            {vivienda ? (
                <React.Fragment>
                    <div className={styles.navBarWrapper}>
                        <NavBar />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.goBack}>
                            <button onClick={() => navigate("/home")}> {"< Back"}</button>
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
                                    <img src={ImgUno} alt="house-image" className={styles.tresImgIndividual} />
                                    <img src={ImgDos} alt="house-image" className={styles.tresImgIndividual} />
                                    <img src={ImgTres} alt="house-image" className={styles.tresImgIndividual} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detail}>
                                <h6 className={styles.detailLabel}>Habitaciones: {vivienda.habitaciones}</h6>
                                <img src={cama} alt="Cama" className={styles.icono} />
                            </div>
                            <div className={styles.detail}>
                                <h6 className={styles.detailLabel}>Baños: {vivienda.baños}</h6>
                                <img src={ducha} alt="Ducha" className={styles.icono} />
                            </div>
                            <div className={styles.detail}>
                                <h6 className={styles.detailLabel}>Cochera: {vivienda.cochera}</h6>
                            </div>
                            <div className={styles.detail}>
                                <h6 className={styles.detailLabel}>Ciudad: {vivienda.ciudad}</h6>
                                <img src={ubi} alt="Ciudad" className={styles.icono} />
                            </div>
                            <div className={styles.detail}>
                                <h6 className={styles.detailLabel}>mcTerreno: {vivienda.mcTerreno}</h6>
                                <img src={casa} alt="Casa" className={styles.icono} />
                            </div>
                        </div>
                        <div className={styles.buyButtonContainer}>
                            <PayButton
                                items={vivienda}
                            />
                            <button className={styles.buyButton}>
                                Consultar
                            </button>
                        </div>
                        <div>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "40vh", width: "102%" }}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                        </MapContainer>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className={styles.navBarWrapper}>
                        <NavBar />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.goBack}>
                            <button onClick={() => navigate("/home")}> {"< Back"}</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Detail;






