import * as actionTypes from './actions';

const initialState = {
    toppings: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    totalPrice: 2
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
        case actionTypes.ADD_TOPPINGS:
            return {
                ...state,
                toppings: {
                    ...state.toppings,
                    [action.toppingName]: state.toppings[action.toppingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.toppingName]
            }
        case actionTypes.REMOVE_TOPPINGS:
            return {
                ...state,
                toppings: {
                    ...state.toppings,
                    [action.toppingName]: state.toppings[action.toppingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.toppingName]
            }
        default:
            return state;
    }
};

export default reducer;