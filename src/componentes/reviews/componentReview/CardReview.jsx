import style from './CardReview.module.css'

export const CardReview = ({ name,message }) => {
    
    return (
    <>
        <div className={ style.contentCard } >
            <div className={ style.contentProfile } >
                <img className={ style.profileImg } src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Imagen de perfil" />
                <p className={ style.nameUser } >{ name }</p>
            </div>
            <div className={ style.contentReview } >
                <div className={ style.comillas } >
                    <img className={ style.imgComilla } src="https://res.cloudinary.com/dstaqtpvc/image/upload/v1706119307/h6odaitfbfr2nuqrztsd.svg" alt="comillas" />
                </div>
                <p className={ style.pReview } >
                    { message }
                </p>
                <div className={ style.comillasEnd } >
                    <img className={ style.imgComilla } src="https://res.cloudinary.com/dstaqtpvc/image/upload/v1706119307/h6odaitfbfr2nuqrztsd.svg" alt="comillas" />
                </div>
            </div>
        </div>
    </>
  )
}
