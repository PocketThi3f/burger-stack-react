import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state ={
        toppings: null,
        price: 0
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const toppings = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                toppings[param[0]] = +param[1];
            }
        }
        this.setState({
            toppings: toppings,
            totalPrice: price
        });
    }

    // When you cancel the meal purchase, go back a page
    onCheckoutFail = () => {
        this.props.history.goBack();
    }

    // When submitting meal purchase, continues data
    onCheckoutPass = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    toppings={this.state.toppings}
                    onCheckoutFail={this.onCheckoutFail}
                    onCheckoutPass={this.onCheckoutPass} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData toppings={this.state.toppings} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;