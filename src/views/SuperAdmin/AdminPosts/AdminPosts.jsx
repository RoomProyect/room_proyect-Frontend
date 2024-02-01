import styles from "./AdminPosts.module.css";
import Navbar from "../../../componentes/navBar/NavBar";
import { useNavigate } from "react-router-dom";
import {
    getDeptoAsync,
    nextPage,
    prevPage,
    putDeptoActions,
    getProvincias,
} from "../../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../../componentes/footer/footer";
import Filters from "../../../componentes/filters/filters";

const AdminPost = () => {

    const [editingDeptoId, setEditingDeptoId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [dataInput, setDataInput] = useState({});
    const [selectedProvince, setSelectedProvince] = useState('');

    const paginate = useSelector((state) => state.counter.paginado);
    const deptos = useSelector((state) => state.counter.deptos);
    const provincias = useSelector((state) => state.counter.provincias);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProvincias());
    }, []);

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        const user = JSON.parse(userStorage);

        if (user[0].rol !== "superadmin") {
        navigate("/home");
        }
    }, []);

    useEffect(() => {
        dispatch(getDeptoAsync(paginate.pageActual));
    }, [dispatch, paginate.pageActual]);

    const handleChangePage = (event) => {
        if (
        event.target.name === "next" &&
        paginate.pageActual < paginate.totalPages
        ) {
        dispatch(nextPage());
        }
        if (event.target.name === "back" && paginate.pageActual > 1) {
        dispatch(prevPage());
        }
    };

    const handleData = (e) => {
        const valor = e.target.value;
        const clave = e.target.name;

        setDataInput((prevDataInput) => ({
        ...prevDataInput,
        [clave]: valor,
        }));
    };

    const handleProvinceSelectChange = (event) => {
        const selectedProvinceName = event.target.value;
        setSelectedProvince(selectedProvinceName);
    };

    const handleClickDelete = async (event) => {
        const updatedActiveState = event.target.value === "true" ? false : true;
        await dispatch(
        putDeptoActions({
            _id: event.target.id,
            active: updatedActiveState,
        })
        );
        await dispatch(getDeptoAsync(paginate.pageActual));
    };

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
            <Navbar />
        </div>
        <div className={styles.contetTitle}>
            <h1 className={styles.title}>Admin DashBoard</h1>
        </div>
            <div className={styles.contentTable}>
                <div className={styles.tableHeader}>
                <h2>Tabla de Posteos</h2>
                </div>
                <div className={styles.filters}>
                <Filters />
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
                    {deptos?.map((depto) => (
                    <tr key={depto._id}>
                        <td>
                        {editingDeptoId === depto._id ? (
                            <input
                            type="text"
                            name="titulo"
                            value={dataInput.titulo}
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
                            value={dataInput.precio}
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
                            value={dataInput.habitaciones}
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
                            value={dataInput.baños}
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
                            value={dataInput.cochera}
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
                                            value={dataInput.mcTerreno }
                                            onChange={handleData}
                                        />
                                    ) : (
                                        depto?.mcTerreno
                                    )}
                                </td>
                                <td>{depto.active ? "Activo" : "Inactivo"}</td>
                                <td>
                                    {editingDeptoId === depto._id ? (
                                        <button
                                            className={styles.viewButton}
                                            onClick={() => handleEdit(depto._id)}
                                        >
                                            Guardar
                                        </button>
                                    ) : (
                                        <>
                                            <Link to={`/detail/${depto._id}`}>
                                                <button className={styles.blueButton}>
                                                    Ver Publicacion
                                                </button>
                                            </Link>
                                            <button
                                                className={depto.active ? styles.redButton : styles.blueButton}
                                                id={depto._id}
                                                onClick={handleClickDelete}
                                                value={depto.active}
                                            >
                                                {depto.active ? 'Borrado Lógico' : 'Activar Nuevamente'}
                                            </button>
                                            <button
                                                className={styles.viewButton}
                                                onClick={() => handleEdit(depto._id)}
                                            >
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
                <button
                    name="back"
                    onClick={handleChangePage}
                    className={styles.paginateButton}
                >
                    Back
                </button>
                <span>
                    {paginate.pageActual}/{paginate.totalPages}
                </span>
                <button
                    name="next"
                    onClick={handleChangePage}
                    className={styles.paginateButton}
                >
                    Next
                </button>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AdminPost;
