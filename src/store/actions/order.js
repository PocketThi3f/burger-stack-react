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

export const burgerOpenOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        // End with .json in order for Firebase to call/function
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseSuccess(res.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseCancel(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersCancel = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_CANCEL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                // To view the keys/ids as props
                // console.log(res.data);
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersCancel(err));
            });
    };
};