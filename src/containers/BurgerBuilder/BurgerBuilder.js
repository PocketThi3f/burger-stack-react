import React, { Component } from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1,
    bacon: 0.75
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state {
            
    //     }
    // }
    // {
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    //     salad: 0
    // }

    // Let's use the more modern approach for state
    state = {
        toppings: null,
        totalPrice: 2.00,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    // Component to retrieve data from backend (Firebase)
    componentDidMount () {
        console.log(this.props);
        axios.get('https://burger-stackz.firebaseio.com/toppings.json')
            .then(res => {
                this.setState({
                    toppings: res.data
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                });
            });
    }

    // Purchase with Order Button and then pop-up a Modal with Summary
    updatePurchaseState (toppings) {
        const sum = Object.keys(toppings)
            .map(igKey => {
                return toppings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    // Adding an ingredient
    addIngredientHandler = (type) => {
        const oldCount = this.state.toppings[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.toppings
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            toppings: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    // Removing an ingredient
    removeIngredientHandler = (type) => {
        const oldCount = this.state.toppings[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.toppings
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            toppings: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    // Confirming purchase with handler; Note => You cannot use it in its raw form [not as => function] when handling events
    purchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    // Close the modal or cancelling the purchase modal
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    // Allow purchase to go through
    purchaseApproveHandler = () => {
        //alert('Have a splendid day.');
        const queryParams = [];
        for (let i in this.state.toppings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.toppings[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    // Rendering of the main Container, where the controls and components should be shown (treat as if the entire page)
    render () {
        const disabledInfo = {
            ...this.state.toppings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Assign new let variable to keep orderSummary from failing
        let orderSummary = null;

        // New let variable to show spinner while we wait for burger to render
        let burger = this.state.error ? <p>Toppings got thrown out!</p> : <Spinner />;

        if (this.state.toppings) {
            burger = (
                <Aux>
                    <Burger toppings={this.state.toppings} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchased={this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
            toppings={this.state.toppings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseApproved={this.purchaseApproveHandler}
            price={this.state.totalPrice} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);