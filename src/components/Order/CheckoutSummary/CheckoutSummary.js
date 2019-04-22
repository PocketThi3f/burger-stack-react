import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Enjoy It, Lad.</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger toppings={props.toppings} />
            </div>
            <Button 
                btnType="Danger" 
                clicked={props.onCheckoutFail}>Deny</Button>
            <Button 
                btnType="Success"
                clicked={props.onCheckoutPass}>Accept</Button>
        </div>
    );
}

export default checkoutSummary;