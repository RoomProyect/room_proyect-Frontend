import styles from './AdminPostsForID.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeptoAsync, nextPage, prevPage, putDeptoActions } from '../../../redux/actions';
import { useEffect, useState } from "react";
import Navbar from '../../../componentes/navBar/NavBar';
import { Link } from 'react-router-dom';
// import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../componentes/footer/footer"



const AdminPostForID = () => {

    const [editingDeptoId, setEditingDeptoId] = useState(null);
    const [edit, setEdit] = useState(false)
    const [dataInput, setDatainput] = useState({})
    const paginate = useSelector(state => state.counter.paginado);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const userStorage = localStorage.getItem( "user" );
        const user = JSON.parse( userStorage );
        console.log( user[0].rol );

        if(user[0].rol !== "superadmin"){
            
            navigate('/home')
            alert('tomatela no tenes rol: (solo SuperAdmin)')
        }
    })


    useEffect(() => {
        dispatch(getDeptoAsync(paginate.pageActual))
    }, [dispatch, paginate.pageActual,])

    const handleChangePage = (event) => {
        if (event.target.name === 'next' && paginate.pageActual < paginate.totalPages) {
            dispatch(nextPage());
        }
        if (event.target.name === 'back' && paginate.pageActual > 1) {
            dispatch(prevPage());
        }
    }


    const { id } = useParams();
    const deptos = useSelector((state) => state.counter.deptos);
    const deptoForID = deptos.filter((depto) => {
        return depto.userId == id;
    });

        console.log(deptoForID);

    const handleData = (e) => {
        const valor = e.target.value;
        const clave = e.target.name;

        setDatainput((prevDataInput) => ({
            ...prevDataInput,
            [clave]: valor
        }));
    }


    const handleClickDelete = (event)=>{
        if(event.target.value === 'true'){
            dispatch(putDeptoActions({_id: event.target.id, active: false}))
        }else{
            dispatch(putDeptoActions({_id: event.target.id, active: true}))
        }
        
    }

    const handleEdit = (deptoId) => {

        setEdit(!edit);
        setEditingDeptoId(edit ? null : deptoId);
    
        // Envía la solicitud de edición, asegurándote de pasar el deptoId correcto
        dispatch(putDeptoActions({ _id: deptoId, ...dataInput }));
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.navBar}>
                <Navbar/>
            </div>
            <div className={styles.contetTitle}>
                <h1 className={styles.title}>Admin DashBoard</h1>
            </div>
            <div className={styles.contentTable}>
                <div className={styles.tableHeader}>
                    <h2>Tabla de Posteos por Usuario</h2>
                </div>
                <table className={styles.userTable}>
                    <thead>
                        <tr className={styles.tableHeaderRow}>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Habitaciones</th>
                            <th>Baños</th>
                            <th>Cochera</th>
                            <th>Provincia</th>
                            <th>mcTerreno</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {deptoForID?.map((depto) => (
                            <tr key={depto._id}>
                                <td>
                                    {deptoForID === depto._id ? (
                                        <input
                                            type="text"
                                            name="titulo"
                                            value={dataInput.titulo || depto.titulo}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.titulo
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="precio"
                                            value={dataInput.precio || depto.precio}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.precio
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="habitaciones"
                                            value={dataInput.habitaciones || depto.habitaciones}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.habitaciones
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="baños"
                                            value={dataInput.baños || depto.baños}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.baños
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="cochera"
                                            value={dataInput.cochera || depto.cochera}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.cochera
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="ciudad"
                                            value={dataInput.ciudad || depto.ciudad}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.ciudad
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="text"
                                            name="mcTerreno"
                                            value={dataInput.mcTerreno || depto.mcTerreno}
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.mcTerreno
                                    )}
                                </td>
                                <td>{depto.active?"Activo":"Inactivo"}</td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <button className={styles.viewButton} onClick={() => handleEdit(depto._id)}>
                                            Guardar
                                        </button>
                                    ) : (
                                        <>
                                        <Link to={`/detail/${depto._id}`}>
                                            <button className={styles.blueButton}>Ver Publicacion</button>
                                        </Link>
                                            <button className={styles.redButton} id={depto._id} value={depto.active} onClick={handleClickDelete}>Borrado Logico</button>
                                            <button className={styles.viewButton} onClick={() => handleEdit(depto._id)}>
                                                Editar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
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

export default AdminPostForID;