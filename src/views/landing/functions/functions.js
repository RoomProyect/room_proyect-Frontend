
export const handleLogout = () => {
    localStorage.removeItem( 'user' );
    dispatch(setUser(null));
}

export const handleNewReview = () => {
    let fondo = document.getElementById( 'fondoBlur' );
    let comments = document.getElementById( 'reviews' );
    let modal = document.getElementById( 'modal' );
    fondo.style.backgroundColor = 'rgb(0 0 0 / 80%)';
    fondo.style.display = 'flex';
    comments.style.filter = 'blur(4px)';
    modal.style.display = 'flex';
}

export const handleClose = () => {
    let fondo = document.getElementById( 'fondoBlur' );
    let comments = document.getElementById( 'reviews' );
    let modal = document.getElementById( 'modal' );
    fondo.style.backgroundColor = 'rgb(255 255 255 / 100%)';
    fondo.style.display = 'none';
    comments.style.filter = 'blur(0px)';
    modal.style.display = 'none';
}