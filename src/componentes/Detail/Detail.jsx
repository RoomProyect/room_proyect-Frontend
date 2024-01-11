

const Detail = () =>{
    return (
        <>
        <div className="w-full bg-[#F9F9F9]">
            <div className="container max-w-full flex flex-row pt-6 pb-6 gap-10 lg:pl-24 md:pl-16 xl:gap-80 xl:pl-48 lg:gap-52 md:gap-40">
                <h1 className="text-2xl" > TRAVEL </h1>

                <input type="search" className="bg-black"/>

                <button className="text-[#344E41] bg-black bg-opacity-25 p-1 pl-3 pr-3 rounded-[8px] text-1" >+ Agregar Hospedaje</button>
            </div>
        </div>
        <div className="ml-14 mr-14 bg-black bg-opacity-5 flex justify-center items-center p-8">
            <div className="w-80 h-80 bg-red-600">
                1
            </div>
        </div>
        </>
    )
}

export default Detail;