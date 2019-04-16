import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

// This can go back to a functional component
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.toppings)
        .map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.toppings[igKey]}
            </li>
            );
        });

    return (
        <Aux>
            <h3>Your Order, Good Citizen.</h3>
            <p>Here's what I got so far: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Art Thou Ready?</p>
            <p>The Price You Pay For This Heathen: <strong>{props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Nah, Dump It</Button>
            <Button btnType='Success' clicked={props.purchaseApproved}>Consume and Purchase</Button>
        </Aux>
    );
};

export default orderSummary;