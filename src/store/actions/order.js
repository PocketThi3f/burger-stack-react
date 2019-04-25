import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseCancel = (error) => {
    return {
        type: actionTypes.PURCHASE_CANCEL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const burgerOpenOrder = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        // End with .json in order for Firebase to call/function
        axios.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseSuccess(res.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseCancel(error));
            });
    };
};