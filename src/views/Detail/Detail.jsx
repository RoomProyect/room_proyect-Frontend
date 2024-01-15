import { useSelector } from 'react-redux';
// import vivienda from '../../../../Pruebas/apartmentObj.js'
import NavBar from '../../componentes/navBar/NavBar.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () =>{
    const { id } = useParams()
    const navigate = useNavigate()
    const vivienda = useSelector((state) => {
        const response = state.counter.deptos.find(depto=>{
            return depto._id === id
        })
        return response
    });

    return (
        <>
        {
            vivienda 
            ? <>
            <div className='mb-8'>
                <NavBar/>
            </div>
            <div className="ml-14 mr-14 bg-black bg-opacity-5 flex flex-col justify-center items-center p-8 rounded-2x1 overflow-y-hidden">
                <div className="flex justify-start items-start w-[100%]">
                    <button onClick={()=> navigate(-1)}> {"<- Back"}</button>
                </div>
                <div className="w-[100%] p-10 flex">
                    <img src={vivienda.img} alt="house-image" className="w-[430px] h-[370px] rounded-3xl"/>
                    <div className='flex flex-col pl-4' >
                        <h3 className='mb-3 font-open-sans font-bold' >{vivienda.titulo}</h3>
                        <div className='mb-3 font-open-sans font-semibold' >
                            <h6 className='inline text-[#333] font-bold'>from</h6> <span></span>
                            <span className="text-violet-600 font-extrabold">
                                {vivienda.precio} $
                            </span>
                        </div>
                        <p className='text-[#333] font-open-sans'> {vivienda.descripcion} </p>
                    </div>
                </div>
                <div className='w-[100%] mt-4'>
                    <h3 className='mb-4 text-[var(--black, #333)] font-open-sans text-1.30669 font-bold'>DETAILS</h3>
    
                    <p className='text-[var(--black, #333)] font-open-sans text-0.735 font-normal leading-1.30669'>{vivienda.descripcion}</p>
                </div>
                <div className='w-[100%] mt-4'>
                    <div className='flex flex-col'>
                        <div> <h6 className='inline text-[#333] font-bold'>Ambientes:</h6> {vivienda.ambiente}</div>
                        <div> <h6 className='inline text-[#333] font-bold'>Baños:</h6> {vivienda.baños}</div>
                        <div> <h6 className='inline text-[#333] font-bold'>Cochera:</h6> {vivienda.cochera}</div>
                        <div> <h6 className='inline text-[#333] font-bold'>Ciudad:</h6> {vivienda.ciudad}</div>
                        <div> <h6 className='inline text-[#333] font-bold'>mcTerreno:</h6> {vivienda.mcTerreno}</div>
                    </div>
                </div>
            </div>
            </>
            : <>
            <div className='mb-8'>
                <NavBar/>
            </div>
            <div className="ml-14 mr-14 bg-black bg-opacity-5 flex flex-col justify-center items-center p-8 rounded-2x1 overflow-y-hidden">
                <div className="flex justify-center items-center w-[100%] h-[40vh]">
                    <button onClick={()=> navigate(-1)}> {"<- Back"}</button>
                </div>
            </div>
            </>
        }
        </>
    )
}

export default Detail;