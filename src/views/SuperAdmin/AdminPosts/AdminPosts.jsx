import styles from './AdminPosts.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import Footer from '../../../componentes/footer/footer';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {  getDeptoAsync, nextPage, prevPage } from '../../../redux/actions'; 


const AdminPost = () => {

    // const dispatch = useDispatch();
    // const paginate = useSelector ( state => state.counter.paginado );

    // useEffect(()=>{
    //     dispatch(getDeptoAsync( paginate.pageActual ))
    // }, [dispatch, paginate.pageActual])

    // const handleChangePage = ( event ) => {
    //     if( event.target.name === 'next' && paginate.pageActual < paginate.totalPages ){
    //         dispatch( nextPage() );
    //     }
    //     if( event.target.name === 'back' && paginate.pageActual > 1 ){
    //         dispatch( prevPage() );
    //     }
    // }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.navBar}>
                <Navbar />
            </div>
            <div className={styles.contetTitle}>
                <h1 className={styles.title}>Admin DashBoard</h1>
            </div>
            <div className={styles.contentTable}>
                    <div className={styles.tableHeader}>
                        <h2>Tabla de Posteos</h2>
                    </div>
                    <table className={styles.userTable}>
                        <thead>
                            <tr className={styles.tableHeaderRow}>
                                <th>titulo</th>
                                <th>precio</th>
                                <th>Habitaciones</th>
                                <th>Baños</th>
                                <th>Cochera</th>
                                <th>Porvincia</th>
                                <th>mcTerreno</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Departamento en Trevelin</td>
                                <td>150000$</td>
                                <td>2</td>
                                <td>1</td>
                                <td>No tiene</td>
                                <td>Chubut</td>
                                <td>200m2</td>
                                <td>                                  
                                    <button className={styles.blueButton}>Ver Publicacion</button>
                                    <button className={styles.redButton}>Borrado Logico</button>
                                    <button className={styles.viewButton}>Editar Publicacion</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            {/* <div className={styles.contentPaginate}>
                <button name="back" onClick={handleChangePage} className={styles.paginateButton}>
                    Back
                </button>
                <span>{paginate.pageActual}/{paginate.totalPages}</span>
                <button name="next" onClick={handleChangePage} className={styles.paginateButton}>
                    Next
                </button>
            </div> */}
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default AdminPost;