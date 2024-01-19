import React from 'react'
import axios from 'axios'

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
            {console.log(items)}
            {/* {console.log(response)} */}
            <button onClick={() => handlerCheckout()} > Promprar </button>
        </>
    )
}

export default PayButton