import * as actionTypes from '../actions/actionTypes';

const initialState = {
    toppings: null,
    totalPrice: 2,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1,
    bacon: 0.85
};

// Demo of deep cloning states with copying and pasting into a newly created object
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TOPPING:
            return {
                ...state,
                toppings: {
                    ...state.toppings,
                    [action.toppingName]: state.toppings[action.toppingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.toppingName]
            }
        case actionTypes.REMOVE_TOPPING:
            return {
                ...state,
                toppings: {
                    ...state.toppings,
                    [action.toppingName]: state.toppings[action.toppingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.toppingName]
            }
        case actionTypes.SET_TOPPINGS:
            return {
                ...state,
                toppings: action.toppings, // Here you would need to set a new object and list as action.toppings.salad (manually changing order of ingredients)
                error: false
            }
        case actionTypes.FETCH_TOPPING_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;