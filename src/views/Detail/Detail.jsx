import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../componentes/navBar/NavBar.jsx';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from './Detail.module.css';

import ImgUno from '../../assets/cloudinary/fotosDetailPrueba/depto1.jpg';
import ImgDos from '../../assets/cloudinary/fotosDetailPrueba/depto2.jpg';
import ImgTres from '../../assets/cloudinary/fotosDetailPrueba/depto3.jpg';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vivienda = useSelector((state) => {
        const response = state.counter.deptos.find((depto) => depto._id === id);
        return response;
    });

    const [isZoomed, setIsZoomed] = useState(false);

    const handleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <>
            <div className={styles.navBarWrapper}>
                <NavBar />
            </div>
            <div className={styles.container}>
                <div className={styles.goBack}>
                    <button onClick={() => navigate(-1)}> {"< Back"}</button>
                </div>
                <div className={styles.propertyDetails}>
                    {isZoomed ? (
                        <TransformWrapper
                            initialScale={1}
                            initialPositionX={200}
                            initialPositionY={100}
                        >
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <TransformComponent>
                                    <img
                                        src={vivienda.img}
                                        alt="house-image"
                                        className={styles.propertyImage}
                                    />
                                    <div className="tools">
                                        <button onClick={() => zoomIn()}>+</button>
                                        <button onClick={() => zoomOut()}>-</button>
                                        <button onClick={() => resetTransform()}>x</button>
                                    </div>
                                </TransformComponent>
                            )}
                        </TransformWrapper>
                    ) : (
                        <>
                            <img
                                src={vivienda.img}
                                alt="house-image"
                                className={styles.propertyImage}
                                onClick={handleZoom}
                            />
                            <div className={styles.propertyInfo}>
                                <h3 className={styles.propertyTitle}>{vivienda.titulo}</h3>
                                <div className={styles.priceInfo}>
                                    <span className={styles.priceValue}>Por: {vivienda.precio}$</span>
                                </div>
                                <div className={styles.descripcion}>
                                    <span className={styles.descripcion}>{vivienda.descripcion}</span>
                                </div>
                                <div className={styles.tresImg}>
                                    {/* Aplicar la funcionalidad de zoom a cada imagen individual */}
                                    <TransformWrapper
                                        initialScale={1}
                                        initialPositionX={200}
                                        initialPositionY={100}
                                    >
                                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                            <TransformComponent>
                                                <img
                                                    src={ImgUno}
                                                    alt="house-image"
                                                    className={styles.tresImgIndividual}
                                                />
                                                <div className="tools">
                                                    <button onClick={() => zoomIn()}>+</button>
                                                    <button onClick={() => zoomOut()}>-</button>
                                                    <button onClick={() => resetTransform()}>x</button>
                                                </div>
                                            </TransformComponent>
                                        )}
                                    </TransformWrapper>
                                    <TransformWrapper
                                        initialScale={1}
                                        initialPositionX={200}
                                        initialPositionY={100}
                                    >
                                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                            <TransformComponent>
                                                <img
                                                    src={ImgDos}
                                                    alt="house-image"
                                                    className={styles.tresImgIndividual}
                                                />
                                                <div className="tools">
                                                    <button onClick={() => zoomIn()}>+</button>
                                                    <button onClick={() => zoomOut()}>-</button>
                                                    <button onClick={() => resetTransform()}>x</button>
                                                </div>
                                            </TransformComponent>
                                        )}
                                    </TransformWrapper>
                                    <TransformWrapper
                                        initialScale={1}
                                        initialPositionX={200}
                                        initialPositionY={100}
                                    >
                                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                            <TransformComponent>
                                                <img
                                                    src={ImgTres}
                                                    alt="house-image"
                                                    className={styles.tresImgIndividual}
                                                />
                                                <div className="tools">
                                                    <button onClick={() => zoomIn()}>+</button>
                                                    <button onClick={() => zoomOut()}>-</button>
                                                    <button onClick={() => resetTransform()}>x</button>
                                                </div>
                                            </TransformComponent>
                                        )}
                                    </TransformWrapper>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.additionalDetailsContainer}>
                   
                </div>
                <div className={styles.buyButtonContainer}>
                    <button className={styles.buyButton}>
                        Comprar
                    </button>
                    <button className={styles.buyButton}>
                        Consultar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Detail;



