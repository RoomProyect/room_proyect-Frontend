import styles from './AdminHome.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import Footer from '../../../componentes/footer/footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActionsUsers } from '../../../redux/actions';


const AdminHomeUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActionsUsers())
    }, [dispatch])


    

     const users = useSelector((state) => state.counter.users);

     console.log(' aca estan los users'+users);

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
                            <th>Usuario</th>
                            <th>Activo/Inactivo</th>
                            <th>Rol</th>
                            <th>Correo</th>
                            <th>Ver Publicaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                         {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.active }</td>
                                <td>{user.rol}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className={styles.viewButton}>Ver Publicaciones</button>
                                </td>
                            </tr>
                        ))} 
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
                <Footer />
            </div>
        </div>
    );
};

export default AdminHomeUsers;