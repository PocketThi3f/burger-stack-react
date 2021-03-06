import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'}
];

// File that allows the of building the burger
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Your Price: <strong>${(props.price).toFixed(2)}</strong></p>
        {controls.map(ctrl =>  (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                remove={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchased}>{props.isAuth ? 'Grill Burger' : 'Sign Up First!'}</button>
    </div>
);

export default buildControls;