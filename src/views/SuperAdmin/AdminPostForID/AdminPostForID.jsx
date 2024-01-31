import styles from './AdminPostsForID.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeptoAsync, nextPage, prevPage, putDeptoActions, getProvincias } from '../../../redux/actions';
import { useEffect, useState } from "react";
import Navbar from '../../../componentes/navBar/NavBar';
import { Link } from 'react-router-dom';
// import { set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../componentes/footer/footer"
import Swal from 'sweetalert2'

const AdminPostForID = () => {

    const [editingDeptoId, setEditingDeptoId] = useState(null);
    const [edit, setEdit] = useState(false)
    const [dataInput, setDataInput] = useState({})

    const paginate = useSelector(state => state.counter.paginado);
    const [selectedProvince, setSelectedProvince] = useState('');
    const provincias = useSelector((state) => state.counter.provincias);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getProvincias());
    }, []);
    
    useEffect(()=>{
        const userStorage = localStorage.getItem( "user" );
        const user = JSON.parse( userStorage );

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
    if (deptoForID.length == 0) {
        Swal.fire({
            icon: 'info',
            title: 'Usuario sin publicaciones',
            text: 'El usuario no ha agregado ninguna publicación.',
        })
        navigate('/AdminUsers')
    }

    const handleData = (e) => {
        const valor = e.target.value;
        const clave = e.target.name;

        setDataInput((prevDataInput) => ({
            ...prevDataInput,
            [clave]: valor
        }));
    }

    const handleProvinceSelectChange = (event) => {
        const selectedProvinceName = event.target.value;
        setSelectedProvince(selectedProvinceName);
    };

    const handleClickDelete = (event)=>{
        if(event.target.value === 'true'){
            dispatch(putDeptoActions({_id: event.target.id, active: false}))
        }else{
            dispatch(putDeptoActions({_id: event.target.id, active: true}))
        }
        
    }

    const handleEdit = async (deptoId) => {
        setEdit(!edit);
        setEditingDeptoId(edit ? null : deptoId);
        const depto = deptos.find((depto) => depto._id === deptoId);
        setDataInput(depto);
        console.log(depto);

        if (edit) {
            // Almacena solo el nombre de la provincia
            await dispatch(
                putDeptoActions({
                    _id: deptoId,
                    ...dataInput,
                    provincias: selectedProvince,
                })
            );
            
            setDataInput({});
            await dispatch(getDeptoAsync(paginate.pageActual));
        }
    };


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
                                            type="number"
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
                                            type="number"
                                            name="habitaciones"
                                            value={dataInput.habitaciones || depto.habitaciones}
                                            onChange={handleData}
                                            min="0"
                                            max="10"
                                            onKeyDown={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        depto?.habitaciones
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="number"
                                            name="baños"
                                            value={dataInput.baños || depto.baños}
                                            onChange={handleData}
                                            min="0"
                                            max="10"
                                            onKeyDown={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        depto?.baños
                                    )}
                                </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="number"
                                            name="cochera"
                                            value={dataInput.cochera || depto.cochera}
                                            onChange={handleData}
                                            min="0"
                                            max="10"
                                            onKeyDown={(e) => e.preventDefault()}
                                        />
                                    ) : (
                                        depto?.cochera
                                    )}
                                </td>
                                <td>
                                {editingDeptoId === depto._id ? (
                                    <div>
                                        <select
                                            type="text"
                                            name="provincia"
                                            value={selectedProvince}
                                            onChange={handleProvinceSelectChange}
                                        >
                                            {provincias.length > 0 ? (
                                                provincias.map((provincia, index) => (
                                                    <option key={index} value={provincia.nombre}>
                                                        {provincia.nombre}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>
                                                    Cargando provincias..
                                                </option>
                                            )}
                                        </select>
                                        <input
                                            type="text"
                                            name="provincias"
                                            value={dataInput.provincias}
                                            onChange={handleData}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                ) : (
                                    depto?.provincias
                                )}
                            </td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <input
                                            type="number"
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