import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    toppings: null,
    totalPrice: 1.50,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1,
    bacon: 0.85
};

// Adding more constants to make code look leaner and cleaner
const addTopping = (state, action) => {
    const updatedTopping = { [action.toppingName]: state.toppings[action.toppingName] + 1 };
    const updatedToppings = updatedObject(state.toppings, updatedTopping);
    const updatedState = {
        toppings: updatedToppings,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.toppingName],
        building: true
    }
    return updatedObject(state, updatedState);
};

const removeTopping = (state, action) => {
    const updatedTopp = { [action.toppingName]: state.toppings[action.toppingName] - 1 };
    const updatedTopps = updatedObject(state.toppings, updatedTopp);
    const updatedSt = {
        toppings: updatedTopps,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.toppingName],
        building: true
    }
    return updatedObject(state, updatedSt);
};

const setToppings = (state, action) => {
    return updatedObject(state, {
            toppings: action.toppings, // Here you would need to set a new object and list as salad: action.toppings.salad (manually changing order of ingredients)
            totalPrice: 1.50,
            error: false,
            building: false
    });
};

const fetchToppingError = (state, action) => {
    return updatedObject(state, {error: true});
};

// Ends here

// Demo of deep cloning states with copying and pasting into a newly created object
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TOPPING:
            return addTopping(state, action);
        case actionTypes.REMOVE_TOPPING:
            return removeTopping(state, action);
        case actionTypes.SET_TOPPINGS:
            return setToppings(state, action);
        case actionTypes.FETCH_TOPPING_ERROR:
            return fetchToppingError(state, action);
        default:
            return state;
    }
};

export default reducer;