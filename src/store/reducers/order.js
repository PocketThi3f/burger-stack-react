import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

// Adding constants to clean up code
const purchaseInit = (state, action) => {
    return updatedObject(state, {purchased: false});
};

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: true});
};

const purchaseSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, {id: action.orderId});
        return updatedObject(state, {
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder)
        });
};

const purchaseCancel = (state, action) => {
    return updatedObject(state, {loading: false});
};

const fetchOrdersStart = (state, action) => {
    return updatedObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersCancel = (state, action) => {
    return updatedObject(state, {loading: false});
};

// Ends Here

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_SUCCESS:
            return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_CANCEL:
            return purchaseCancel(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_CANCEL:
            return fetchOrdersCancel(state, action);
        default:
            return state;
    }
};

export default reducer;