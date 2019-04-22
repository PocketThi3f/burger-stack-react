import React from 'react';

import classes from './Order.css';

const order = (props) => {
    // Logic to turn the ingredients into an array of values
    const toppings = [];

    for (let toppingName in props.toppings) {
        toppings.push(
            {
                name: toppingName, 
                amount: props.toppings[toppingName]
            }
        );
    }

    const toppingOutput = toppings.map(topp => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={topp.name}>{topp.name} ({topp.amount}) </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Toppings: {toppingOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;