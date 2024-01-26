import styles from './AdminUsers.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions';
import axios from 'axios';
import { useState } from 'react';
// import {  getDeptoAsync, nextPage, prevPage } from '../../../redux/actions'; 
const updateUser = async(obj)=>{
    try {
        const {data} = await axios.put('https://room-project-backend.onrender.com/users', obj)
        window.location.reload()
    } catch (error) {
       console.log(error.message)
    }
}

const AdminUsers = () => {
    const users = useSelector((state) => state.user.users);
    const [rol, setRol] = useState("--");
    const dispatch = useDispatch();
    useEffect(() => {
        if(users){
            dispatch(getUsers())
        }
    }, []);

    const handleClickRol = (event)=>{
        if(rol == "--"){return ""}
        const newUser ={_id: event.target.id, rol:rol}
        updateUser(newUser)
        
    }

    const handleClickBan = (event)=>{
        
        if(event.target.value === 'true'){
            updateUser({_id: event.target.id, active: false})
        }else{
            updateUser({_id: event.target.id, active: true})
        }
        
    }

    const handleChange = (event) =>{
        setRol(event.target.value);
    }
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
                            {users.map((user)=>{
                                return <tr key= {user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.active?"Activo":"Inactivo"}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select name="rol" id="rol" onChange={handleChange}>
                                                <option value="--">--</option>
                                                <option value="admin">admin</option>
                                                <option value="user">user</option>
                                            </select>

                                            <button className={styles.blueButton} id={user._id} onClick={handleClickRol}>Dar Rol</button>
                                            <button className={styles.redButton} id={user._id} value = {user.active} onClick={handleClickBan}>Banear/Desbanear</button>
                                            <button className={styles.viewButton}>Ver Publicación</button>
                                        </td>
                                    </tr>
                            })}

                        </tbody>
                    </table>
            </div>
        </div>
    );
};

export default AdminUsers;