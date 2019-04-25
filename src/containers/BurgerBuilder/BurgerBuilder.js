import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Aux from '../../hoc/Aux.js';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as burgerBuilderActions from '../../store/actions/index';


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
        purchasing: false
    }

    // Component to retrieve data from backend (Firebase)
    componentDidMount () {
        console.log(this.props);
        this.props.onInitToppings();
    }

    // Purchase with Order Button and then pop-up a Modal with Summary
    // Updated to show Redux local UI state
    updatePurchaseState (toppings) {
        const sum = Object.keys(toppings)
            .map(igKey => {
                return toppings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // Adding an ingredient
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.toppings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.toppings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         toppings: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // Removing an ingredient
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.toppings[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.toppings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         totalPrice: newPrice,
    //         toppings: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

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
    // Updated using Redux, removing the requirement to pass query params
    purchaseApproveHandler = () => {
        this.props.history.push('/checkout');
    }
    // purchaseApproveHandler = () => {
    //     //alert('Have a splendid day.');
    //     const queryParams = [];
    //     for (let i in this.state.toppings) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.toppings[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

    // Rendering of the main Container, where the controls and components should be shown (treat as if the entire page)
    render () {
        const disabledInfo = {
            ...this.props.topps
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Assign new let variable to keep orderSummary from failing
        let orderSummary = null;

        // New let variable to show spinner while we wait for burger to render
        let burger = this.props.error ? <p>Toppings got thrown out!</p> : <Spinner />;

        if (this.props.topps) {
            burger = (
                <Aux>
                    <Burger toppings={this.props.topps} />
                    <BuildControls 
                        ingredientAdded={this.props.onToppingAdded}
                        ingredientRemoved={this.props.onToppingRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.topps)}
                        purchased={this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
            toppings={this.props.topps}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseApproved={this.purchaseApproveHandler}
            price={this.props.price} />;
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

const mapStateToProps = state => {
    return {
        topps: state.toppings,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onToppingAdded: (toppingName) => dispatch(burgerBuilderActions.addTopping(toppingName)),
        onToppingRemoved: (toppingName) => dispatch(burgerBuilderActions.removeTopping(toppingName)),
        onInitToppings: () => dispatch(burgerBuilderActions.initToppings())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));