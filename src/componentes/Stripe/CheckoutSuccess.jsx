import React from 'react';
import {Link} from 'react-router-dom';
import style from "./CheckoutSuccess.module.css";
import check from "../../tilde.png";

const CheckoutSuccess = () => {
    return (
        <div className={style.mainContainer}>
            <div className={style.container}>

                <div className={style.checkContainer}>
                    <img className={style.check} src = {check} alt="check"></img>
                </div>

                <div className={style.title1}>
                    <h2>Your Order is complete!</h2>
                </div>

                <div className={style.title2}>
                    <p>You will be receiving a confirmation email with order details.</p>
                </div>

                <div>
                    <Link to="/home">            
                    <button className={style.backButton}>Go to the Home Page</button>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}

export default CheckoutSuccess