import styles from './AdminPosts.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import axios from 'axios';

const updateUser = async(obj)=>{
    try {
        console.log(obj)
        const {data} = await axios.put('https://room-project-backend.onrender.com/users', obj)
        console.log(data)
        window.location.reload()
    } catch (error) {
        console.log(error.message)
    }
}


const AdminPost = () => {

    const handleClickBan = (event)=>{
        
        if(event.target.value === 'true'){
            updateUser({_id: event.target.id, active: false})
        }else{
            updateUser({_id: event.target.id, active: true})
        }
        
    }


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
                                    <button className={styles.redButton} id={user._id} value = {user.active} onClick={handleClickBan}>Borrado Logico</button>
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