import React, { Component } from 'react';

import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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

    // Let's use the more modern approach for state
    state = {
        toppings: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 2.00,
        purchasable: false,
        purchasing: false
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
        alert('Have a splendid day.');
    }

    // Rendering of the main Container, where the controls and components should be shown (treat as if the entire page)
    render () {
        const disabledInfo = {
            ...this.state.toppings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        toppings={this.state.toppings}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseApproved={this.purchaseApproveHandler}
                        price={this.state.totalPrice} />
                </Modal>
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
    }
};

export default BurgerBuilder;