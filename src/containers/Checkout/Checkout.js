import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // state ={
    //     toppings: null,
    //     price: 0
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const toppings = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         }
    //         else {
    //             toppings[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({
    //         toppings: toppings,
    //         totalPrice: price
    //     });
    // }

    // Lifecycle method
    componentWillMount () {
        this.props.onInitPurchase();
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
        let summary = <Redirect to='/' />;
        if (this.props.topps) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                {purchaseRedirect}
                <CheckoutSummary 
                    toppings={this.props.topps}
                    onCheckoutFail={this.onCheckoutFail}
                    onCheckoutPass={this.onCheckoutPass} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
                    {/* render={(props) => (<ContactData toppings={this.state.toppings} price={this.state.totalPrice} {...props} />)} */}
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        topps: state.burgerBuilder.toppings,
        purchased: state.order.purchased
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);