import styles from './AdminHome.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import Footer from '../../../componentes/footer/footer';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {  getDeptoAsync, nextPage, prevPage } from '../../../redux/actions'; 


const AdminHomeUsers = () => {

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
                        <h2>Tabla de Usuarios</h2>
                    </div>
                    <div className={styles.tableActions}>
                        <button className={styles.blueButton}>Dar Rol</button>
                        <button className={styles.redButton}>Banear</button>
                    </div>
                    <table className={styles.userTable}>
                        <thead>
                            <tr className={styles.tableHeaderRow}>
                                <th>Users</th>
                                <th>Activo/Inactivo</th>
                                <th>ROL</th>
                                <th>CORREO</th>
                                <th></th> {/* Espacio para el botón "Ver Publicación" */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Usuario1</td>
                                <td>Activo</td>
                                <td>Rol1</td>
                                <td>correo1@example.com</td>
                                <td>
                                    <button className={styles.viewButton}>Ver Publicaciónes</button>
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

export default AdminHomeUsers;