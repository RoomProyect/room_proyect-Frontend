import React from 'react'
import axios from 'axios'
import styles from '../../views/Detail/Detail.module.css'

const PayButton = ({items}) => {

    const handlerCheckout = () => {
        axios.post(`http://localhost:3001/create-checkout-session`,  items ).then((res) => {
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

export default PayButton