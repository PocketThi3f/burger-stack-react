import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addTopping = (name) => {
    return {
        type: actionTypes.ADD_TOPPING,
        toppingName: name
    };
};

export const removeTopping = (name) => {
    return {
        type: actionTypes.REMOVE_TOPPING,
        toppingName: name
    };
};

export const setToppings = (toppings) => {
    return {
        type: actionTypes.SET_TOPPINGS,
        toppings: toppings
    };
};

export const fetchToppingError = () => {
    return {
        type: actionTypes.FETCH_TOPPING_ERROR
    };
};

export const initToppings = () => {
    return dispatch => {
        axios.get('https://burger-stackz.firebaseio.com/toppings.json')
            .then(res => {
                dispatch(setToppings(res.data));
            })
            .catch(err => {
                dispatch(fetchToppingError());
            });
    };
};