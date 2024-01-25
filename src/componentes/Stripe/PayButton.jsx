import axios from 'axios'
import styles from '../../views/Detail/Detail.module.css'
import PropTypes from "prop-types";

const PayButton = ({items}) => {

    const handlerCheckout = () => {
        axios.post(`https://room-project-backend.onrender.com/create-checkout-session`,  items ).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }
        })
        .catch((err) => console.log(err.message))
    }

    return (
        <>
            {/* {console.log(items)} */}
            {/* {console.log(response)} */}
            <button className={styles.buyButton} onClick={() => handlerCheckout()} > Comprar </button>
        </>
    )
}

PayButton.propTypes = {
    items: PropTypes.string.isRequired,

};

export default PayButton