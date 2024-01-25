import styles from './AdminPosts.module.css';
import Navbar from '../../../componentes/navBar/NavBar';


const AdminPost = () => {

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
        </div>
    );
};

export default AdminPost;