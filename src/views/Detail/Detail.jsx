import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../componentes/navBar/NavBar.jsx';
import { useState, useRef } from 'react';
import styles from './Detail.module.css';

import ImgUno from '../../assets/cloudinary/fotosDetailPrueba/depto1.jpg';
import ImgDos from '../../assets/cloudinary/fotosDetailPrueba/depto2.jpg';
import ImgTres from '../../assets/cloudinary/fotosDetailPrueba/depto3.jpg';

const ImageWithCursorTracking = ({ src, alt, onHover }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const imgWrap = useRef(null);

  const mWidth = imgWrap?.current?.offsetWidth;
  const mHeight = imgWrap?.current?.offsetHeight;

  return (
    <div
      className="image-wrapper"
      onMouseMove={(e) => {
        setMouseIn(true);
        setCursorX(((e.clientX - imgWrap?.current?.offsetLeft) - mWidth / 2) / mWidth * 100);
        setCursorY(((e.clientY - imgWrap?.current?.offsetTop) - mHeight / 2) / mHeight * 100);
      }}
      onMouseLeave={() => {
        setMouseIn(false);
      }}
      onClick={onHover}
      ref={imgWrap}
    >
      <img
        src={src}
        alt={alt}
        className={styles.tresImgIndividual} // Clase CSS común a todas las imágenes
        style={mouseIn
          ? { transform: `translate(${-cursorX}%, ${-cursorY}%) scale(2.5)`, cursor: 'crosshair' }
          : { transform: 'scale(1)' }
        }
      />
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vivienda = useSelector((state) => {
    const response = state.counter.deptos.find((depto) => depto._id === id);
    return response;
  });

  const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <>
      {vivienda ? (
        <>
          <div className={styles.navBarWrapper}>
            <NavBar />
          </div>
          <div className={styles.container}>
            <div className={styles.goBack}>
              <button onClick={() => navigate(-1)}> {"< Back"}</button>
            </div>
            <div className={styles.propertyDetails}>
              {/* Utilizamos el componente ImageWithCursorTracking para cada imagen */}
              <ImageWithCursorTracking
                src={vivienda.img}
                alt="house-image"
                onHover={() => setHoveredImg('img')}
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
                  {/* Utilizamos el componente ImageWithCursorTracking para cada imagen */}
                  <ImageWithCursorTracking
                    src={ImgUno}
                    alt="house-image"
                    onHover={() => setHoveredImg('ImgUno')}
                  />
                  <ImageWithCursorTracking
                    src={ImgDos}
                    alt="house-image"
                    onHover={() => setHoveredImg('ImgDos')}
                  />
                  <ImageWithCursorTracking
                    src={ImgTres}
                    alt="house-image"
                    onHover={() => setHoveredImg('ImgTres')}
                  />
                </div>
              </div>
            </div>
            <div className={styles.additionalDetailsContainer}>
              {/* Resto del código ... */}
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
              <button onClick={() => navigate(-1)}> {"< Back"}</button>
            </div>
            {/* Resto del código ... */}
          </div>
        </>
      )}
    </>
  );
};

export default Detail;





