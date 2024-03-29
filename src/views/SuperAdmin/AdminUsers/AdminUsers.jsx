import styles from './AdminUsers.module.css';
import Navbar from '../../../componentes/navBar/NavBar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, prevPageUsersAction, nextPageUsersAction, getAllUsers} from '../../../redux/actions';
import axios from 'axios';
import { useState } from 'react';
import Footer from "../../../componentes/footer/footer"
import { useNavigate } from 'react-router-dom';
//import {  getDeptoAsync, nextPage, prevPage } from '../../../redux/actions'; 


export const updateUser = async(obj)=>{
    try {
        const {data} = await axios.put('https://room-project-backend.onrender.com/users', obj)
    } catch (error) {
        console.log(error.message)
    }
}

const AdminUsers = () => {
    const [rol, setRol] = useState("--");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paginate = useSelector(state => state.user.paginado);
    const allUsers = useSelector(state => state.user.allUsers)
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    
    useEffect(()=>{
        const page = 1
        dispatch(getUsers(page))
        dispatch(getAllUsers())
        const userStorage = localStorage.getItem( "user" );
        const user = JSON.parse( userStorage );
        if(user[0].rol !== "superadmin"){
            navigate('/home')
            alert('tomatela no tenes rol: (solo SuperAdmin)')
        }

    },[])
    
    useEffect(() => {
        dispatch(getUsers(paginate.pageActual))
    }, [paginate.pageActual]);

    const handleChangePage = (event) => {
        if (debounceTimeout) {
            // Si hay un timeout activo, cancelarlo
            clearTimeout(debounceTimeout);
        }
        if (event.target.name === 'next' && paginate.pageActual < paginate.totalPages) {
            const timeout = setTimeout(() => {
                dispatch(nextPageUsersAction);
            }, 300);

            setDebounceTimeout(timeout);
        }
        if (event.target.name === 'back' && paginate.pageActual > 1) {
            const timeout = setTimeout(() => {
                dispatch(prevPageUsersAction);
            }, 300);

            setDebounceTimeout(timeout);
        }
    }


    const handleClickRol = async (event)=>{
        if(rol == "--"){return ""}
        const newUser ={_id: event.target.id, rol:rol}
        await updateUser(newUser)
        dispatch(getUsers(paginate.pageActual))
        users = Users
        console.log(users);
    }
    
    const handleClickBan = async(event)=>{    
        if(event.target.value === 'true'){
            await updateUser({_id: event.target.id, active: false})
            dispatch(getUsers(paginate.pageActual))
            users = Users
        }else{
            await updateUser({_id: event.target.id, active: true})
            dispatch(getUsers(paginate.pageActual))
            users = Users
        }       
    }
    
    const handleChange = (event) =>{
        setRol(event.target.value);
    }
    const [pass, setPass] = useState("");

    let Users = useSelector((state) => state.user.users);
    let users = pass
    ? allUsers.filter((u) => {
        const nombreMatch = u.name.toLowerCase().includes(pass.toLowerCase());
        const correoMatch = u.email.toLowerCase().includes(pass.toLowerCase());
        return nombreMatch || correoMatch;
    })
    : Users;

    const handleFind = (event) => {
        const name = event.target.value
        setPass(name)
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
                        <h2>Tabla de Usuarios</h2>
                        <input
                        className={styles.searchBar}
                        onChange={handleFind}
                        type="search"
                        placeholder="Busca por el nombre o dni/pasaporte.."
                        />
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
                                return <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.active?"Activo":"Inactivo"}</td>
                                        <td>{user.rol}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select name="rol" id="rol" onChange={handleChange} className={styles.blueButton}>
                                                <option value="--">--</option>
                                                <option className={styles.blueButton} value="admin">admin</option>
                                                <option value="user">user</option>
                                            </select>

                                            <button className={styles.blueButton} id={user._id} onClick={handleClickRol}>Dar Rol</button>
                                            
                                            <button
                                                className={user.active ? styles.redButton : styles.blueButton}
                                                id={user._id}
                                                onClick={handleClickBan}
                                                value={user.active}
                                            >
                                                {user.active ? 'Banear' : 'Desbanear'}
                                            </button>

                                            <Link to={`/publicaciones/${user._id}` }>
                                                <button className={styles.viewButton } >Ver Publicaciónes</button>
                                            </Link>
                                        </td>
                                    </tr>
                            })}

                        </tbody>
                    </table>
            </div>
            <div className={styles.contentPaginate}>
                <button name="back" onClick={handleChangePage} className={styles.paginateButton}>
                    Back
                </button>
                <span>{paginate.pageActual}/{paginate.totalPages}</span>
                <button name="next" onClick={handleChangePage} className={styles.paginateButton}>
                    Next
                </button>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default AdminUsers;