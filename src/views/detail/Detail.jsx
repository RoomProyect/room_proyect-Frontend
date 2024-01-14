import { useParams,useDispatch, useSelector } from 'react-router-dom'
import styles from '../detail/detail.module.css'
import { useEffect } from 'react';


const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const apartments = useSelector((state) => state.detail);

    return (
        <div>
            {apartments ? (
                <div className={styles.cardetail}>
                    <h1>{apartments.name}</h1>
                    <img className={styles.img} src={apartments.img} alt={apartments.img} />
                    <h2>Detalles</h2>
                    <h4>id: {apartments.id}</h4>
                    <h4>nombre: {apartments.nombre}</h4>
                    <h4>precio: {apartments.precio}</h4>
                    <h4>title: {apartments.title}</h4>
                    <h4>country: {apartments.country}</h4>
                    <h4>image: {apartments.image}</h4>
                    <h4>Description: {apartments.description}</h4>
                    <h4>mc2: {apartments.mc2}</h4>

                </div>
            ) : (
                <p>Cargando detalles del apartamento {id}...</p>
                
            )}
        </div>
    );
};

export default Detail;
