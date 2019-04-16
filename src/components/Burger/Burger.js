import React from 'react';

import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    let placedIngredients = Object.keys(props.toppings)
    .map(igKey => {
        return [...Array(props.toppings[igKey])].map((_, index) => {
            return <Ingredient key={igKey + index} type={igKey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (placedIngredients.length === 0) {
        placedIngredients = <p>Start Your Order!</p>
    }
    // Preview what array is made
    console.log(placedIngredients);
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
                {placedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};


export default burger;