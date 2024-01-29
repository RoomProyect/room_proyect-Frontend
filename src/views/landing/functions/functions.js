

export const handleLogout = () => {
    localStorage.removeItem( 'user' );
    dispatch(setUser(null));
}

export const handleNewReview = () => {
    let fondo = document.getElementById( 'fondoBlur' );
    fondo.style.backgroundColor = 'rgb(0 0 0 / 80%)';
    fondo.style.display = 'flex';
    let modal = document.getElementById( 'modal' );
    modal.style.display = 'flex';
}

export const handleClose = () => {
    let fondo = document.getElementById( 'fondoBlur' );
    fondo.style.backgroundColor = 'rgb(255 255 255 / 100%)';
    fondo.style.display = 'none';
    let modal = document.getElementById( 'modal' );
    modal.style.display = 'none';
}