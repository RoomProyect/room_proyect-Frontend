import styles from './AdminUsers.module.css';
import Navbar from '../../../componentes/navBar/NavBar';

const AdminUsers = () => {


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
                    <table className={styles.userTable}>
                        <thead>
                            <tr className={styles.tableHeaderRow}>
                                <th>Users</th>
                                <th>Activo/Inactivo</th>
                                <th>ROL</th>
                                <th>CORREO</th>
                                <th>{/* Espacio para los botones*/}</th> 
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Usuario1</td>
                                <td>Activo</td>
                                <td>Rol1</td>
                                <td>correo1@example.com</td>
                                <td>                                  
                                    <button className={styles.blueButton}>Dar Rol</button>
                                    <button className={styles.redButton}>Banear</button>
                                    <button className={styles.viewButton}>Ver Publicación</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>

        </div>
    );
};

export default AdminUsers;