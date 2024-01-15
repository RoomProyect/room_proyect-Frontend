import vivienda from '../../../../Pruebas/apartmentObj.js'
import NavBar from '../../componentes/navBar/NavBar.jsx';
import { useParams } from 'react-router-dom';

const Detail = () =>{
    const { id } = useParams

    return (
        <>
        <div className='mb-8'>
            <NavBar/>
        </div>
        <div className="ml-14 mr-14 bg-black bg-opacity-5 flex flex-col justify-center items-center p-8 rounded-2x1 overflow-y-hidden">
            <div className="flex justify-start items-start w-[100%]">
                <button className="bg-[#F9F9F9]" > -- Back</button>
            </div>
            <div className="w-[100%] p-10 flex">
                <img src={vivienda.imagen} alt="house-image" className="w-[430px] h-[370px] rounded-3xl"/>
                <div className='flex flex-col pl-4' >
                    <h3 className='mb-3 text-[var(--black, #333)] font-open-sans text-1.30669 font-bold' >TITULO DEL POSTEO PARA LA CASA</h3>
                    <p className='mb-3 text-[var(--black, #333)] font-open-sans text-1.30669 font-semibold' >
                        from <span></span>
                        <span className="text-violet-600 font-extrabold">
                            {vivienda.precio} $
                        </span>
                    </p>
                    <p className='text-[var(--black, #333)] font-open-sans text-0.735 font-normal leading-1.30669'> {vivienda.descripcion} </p>
                </div>
            </div>
            <div className='w-[100%] mt-4'>
                <h3 className='mb-4 text-[var(--black, #333)] font-open-sans text-1.30669 font-bold'>DETAILS</h3>

                <p className='text-[var(--black, #333)] font-open-sans text-0.735 font-normal leading-1.30669'>{vivienda.descripcion}</p>
            </div>
        </div>
        </>
    )
}

export default Detail;